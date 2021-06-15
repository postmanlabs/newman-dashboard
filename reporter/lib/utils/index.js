const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const socket = io('http://localhost:5001/');

module.exports = {
    handleStart: (err, args) => {
        if (err) {
            // return if any error on starting the run
            return;
        }

        const processId = nanoid(16);
        socket.emit('control:new-run', {
            processId,
        });
    },
};
