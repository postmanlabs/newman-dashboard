const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const socket = io('http://localhost:5001/');
const id = nanoid(16);

module.exports = {
    handleStart: (err, args) => {
        if (err) {
            // return if any error on starting the run
            return;
        }

        socket.emit('control:new-run', {
            id,
        });
    },

    handleDone: (err, args) => {
        if (err) return;

        socket.emit('control:end-run', {
            id,
        });
    },

    handlePause: (err, args) => {
        if (err) return;

        socket.emit('control:pause-run', {
            id,
        });
    },

    handleResume: (err, args) => {
        if (err) return;

        socket.emit('control:resume-run', {
            id,
        });
    },

    handleAbort: (err, args) => {
        if (err) return;

        socket.emit('control:abort-run', {
            id,
        });
    },
};
