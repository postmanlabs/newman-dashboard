// establish socket.io server
const socket = require('socket.io');
const server = require('./server');

const api = require('./api/index');
const utils = require('../lib/utils');

// setup socket.io server
const io = socket(server);

// middleware to extract id from the newman run
io.use(utils.socketAuth);

// event listener for a new connection
io.on('connection', (socket) => {
    if (socket.meta.type === 'newman-run') {
        // push socket to a unique room
        socket.join(`events:${socket.meta.id}`);

        // attach listeners on the socket for run status emits
        socket.on('control:new-run', api.handleNewRun(socket));
        socket.on('control:pause-run', api.handlePauseRun(socket));
        socket.on('control:abort-run', api.handleAbortRun(socket));
        socket.on('control:resume-run', api.handleResumeRun(socket));

        // test socket connection
        socket.on('test:connection', api.handleTestConnection);
    } else if (socket.meta.type === 'frontend') {
        // push socket to a frontend room
        socket.join('frontend');
    }
});

module.exports = { server, io };
