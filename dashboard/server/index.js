// establish socket.io server
const socket = require('socket.io');
const server = require('./server');

const handlers = require('./api/index');
const utils = require('../lib/utils');

const {
    START_RUN,
    PAUSE_RUN,
    ABORT_RUN,
    RESUME_RUN,
    TEST_CONN,
} = require('../lib/constants/socket-events');
const { NEWMAN_RUN, FRONTEND } = require('../lib/constants/socket-rooms');

// setup socket.io server
const io = socket(server);

// middleware to extract id from the newman run
io.use(utils.socketAuth);

// event listener for a new connection
io.on('connection', (socket) => {
    const api = handlers(socket.to(FRONTEND));

    if (socket.meta.type === NEWMAN_RUN) {
        // push socket to a unique room
        socket.join(`events:${socket.meta.id}`);

        // attach listeners on the socket for run status emits
        socket.on(START_RUN, api.handleNewRun);
        socket.on(PAUSE_RUN, api.handlePauseRun);
        socket.on(ABORT_RUN, api.handleAbortRun);
        socket.on(RESUME_RUN, api.handleResumeRun);

        // test socket connection
        socket.on(TEST_CONN, api.handleTestConnection);
    } else if (socket.meta.type === FRONTEND) {
        // push socket to a frontend room
        socket.join(FRONTEND);
    }
});

module.exports = { server, io };
