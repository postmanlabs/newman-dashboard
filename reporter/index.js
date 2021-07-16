const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const id = nanoid(16);
const socket = io('http://localhost:5001/', {
    auth: {
        id,
        type: 'newman-run',
    },
});

const events = require('./lib/events')(socket, id);

module.exports = function (newman, options, collectionOptions) {
    newman.on('start', events.handleStart);
    newman.on('done', events.handleDone);

    newman.on('resume', events.handleResume);
    newman.on('pause', events.handlePause);
    newman.on('abort', events.handleAbort);
};
