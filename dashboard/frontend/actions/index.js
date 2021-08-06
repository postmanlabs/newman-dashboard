// mount sockets
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

const frontendId = nanoid(16);

const mountSockets = (store) => {
    const socket = io('http://localhost:5001/', {
        auth: {
            id: frontendId,
            type: 'frontend'
        }
    });

    socket.on('start', (data) => {
        store.add(data);
    });

    socket.on('abort', (data) => {
        if (!data || !data.id) {
            return;
        }

        const run = store.find(data.id);

        run.setAborted();
    });

    socket.on('pause', (data) => {
        if (!data || !data.id) {
            return;
        }

        const run = store.find(data.id);

        run.setPaused();
    });

    socket.on('resume', (data) => {
        if (!data || !data.id) {
            return;
        }

        const run = store.find(data.id);

        run.setActive();
    });

    socket.on('done', (data) => {
        if (!data || !data.id) {
            return;
        } 
          
        const run = store.find(data.id);

        run.setFinished();
    });

    socket.on('interrupt', (data) => {
        const run = store.find(data.id);
        run.setInterrupted();
    });

    socket.on('run-event', (data) => {
        // eslint-disable-next-line no-console
        console.log(data.type);
        const run = store.find(data.id);
        run.addEvent(data);
    });

    return socket;
};

module.exports = { mountSockets };
