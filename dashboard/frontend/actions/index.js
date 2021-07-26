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
        store.newRun(data);
    });

    socket.on('abort', (data) => {
        store.updateRunStatus(data, 'abort');
    });

    socket.on('pause', (data) => {
        store.updateRunStatus(data, 'pause');
    });

    socket.on('resume', (data) => {
        store.updateRunStatus(data, 'active');
    });

    socket.on('done', (data) => {
        store.setRunFinished(data);
    });

    socket.on('run-event', (data) => {
        console.log(data.name);
    });

    return socket;
};

module.exports = { mountSockets };





