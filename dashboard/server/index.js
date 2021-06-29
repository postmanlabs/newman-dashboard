// establish socket.io server
const socket = require('socket.io');
const server = require('./server');

const handlers = require('./api/index');
const utils = require('../lib/utils');

const constants = require('../constants');

// setup socket.io server
const io = socket(server);

// middleware to extract id from the newman run
io.use(utils.socketAuth);

// event listener for a new connection
io.on('connection', (socket) => {
    const api = handlers(socket.to('frontend'));

    if (socket.meta.type === constants.NEWMAN_RUN) {
        // push socket to a unique room
        socket.join(`events:${socket.meta.id}`);

        // attach listeners on the socket for run status emits
        socket.on(constants.START_RUN, api.handleNewRun);
        socket.on(constants.PAUSE_RUN, api.handlePauseRun);
        socket.on(constants.ABORT_RUN, api.handleAbortRun);
        socket.on(constants.RESUME_RUN, api.handleResumeRun);

        // test socket connection
        socket.on(constants.TEST_CONN, api.handleTestConnection);
    } else if (socket.meta.type === constants.FRONTEND) {
        // push socket to a frontend room
        socket.join('frontend');
    }
});

module.exports = { server, io };
