// mount sockets
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

const frontendId = nanoid(16);

let isMounted = false, tempSocket = null;

const mountSockets = (store) => {
    if (isMounted) {
        return tempSocket;
    }
    
    isMounted = true;

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

        // keep status as aborted
        if(run.isAborted()) return;

        run.setFinished();
    });

    socket.on('interrupt', (data) => {
        const run = store.find(data.id);
        run.setInterrupted();
    });

    socket.on('run-event', (data) => {
        const run = store.find(data.runId);
        run.addEvent(data);

        if(data.err) {
            // mark run as errored
            run.setInterrupted();
        }
    });

    socket.on('run-stats', (data) => {
        const run = store.find(data.runId);
        
        run.addRunStats(data);
    });

    tempSocket = socket;
    return socket;
};

module.exports = { mountSockets };
