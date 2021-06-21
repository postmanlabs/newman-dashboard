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
    // push socket to a unique room
    socket.join(`events:${socket.meta.id}`);

    // attach listeners on the client
    socket.on('control:new-run', api.handleNewRun(socket));

    // test client connection
    socket.on('test:connection', api.handleTestConnection);
});

module.exports = { server, io };
