const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const id = nanoid(16);
const socket = io('http://localhost:5001/', {
    auth: {
        id,
        type: 'newman-run',
    },
});

const utils = require('./lib/utils');
const handlers = require('./lib/handlers')(socket, id);
const runtimeEvents = require('./lib/runtimeEvents');

module.exports = function (newman, options, collectionOptions, commands) {
    newman.on('start', handlers.handleStart);

    const cleanupTimer = utils.getIntervalRunStats(
        500,
        handlers.handleRunStats
    );

    newman.on('done', () => {
        cleanupTimer();
        handlers.handleDone();
    });

    newman.on('resume', handlers.handleResume);
    newman.on('pause', handlers.handlePause);
    newman.on('abort', handlers.handleAbort);

    process.on('SIGINT', handlers.handleInterrupt);

    runtimeEvents.forEach((runEvent) => {
        newman.on(runEvent, handlers.handleRunEvent(runEvent));
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
