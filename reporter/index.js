const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const id = nanoid(16);
const socket = io('http://localhost:5001/', {
    auth: {
        id,
        type: 'newman-run',
    },
});

const events = require('./lib/handlers')(socket, id);
const runtimeEvents = require('./lib/runtimeEvents');

module.exports = function (newman, options, collectionOptions, commands) {
    newman.on('start', events.handleStart);
    newman.on('done', events.handleDone);

    newman.on('resume', events.handleResume);
    newman.on('pause', events.handlePause);
    newman.on('abort', events.handleAbort);

    runtimeEvents.forEach((runEvent) => {
        newman.on(runEvent, events.handleRunEvent(runEvent));
    });

    socket.on('pause', (data) => {
        commands.pause();
    });

    socket.on('resume', () => {
        commands.resume();
    });

    socket.on('abort', () => {
        commands.abort();
    });
};
