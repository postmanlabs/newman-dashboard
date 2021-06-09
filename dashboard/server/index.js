// establish socket.io server
const socket = require('socket.io');
const server = require('./server');

const api = require('./api/index');

// setup socket.io server
const io = socket(server);

// event listener for a new connection
io.on('connection', api.testSocketConnection);

module.exports = { server, io };
