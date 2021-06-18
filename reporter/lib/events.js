const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const socket = io('http://localhost:5001/');
const processId = nanoid(16);

module.exports = {
    handleStart: (err, args) => {
        if (err) {
            // return if any error on starting the run
            return;
        }

        socket.emit('control:new-run', {
            processId,
        });
    },

    handleDone: (err, args) => {
        if (err) return;

        socket.emit('control:end-run', {
            processId,
        });
    },

    handlePause: (err, args) => {
        if (err) return;

        socket.emit('control:pause-run', {
            processId,
        });
    },

    handleResume: (err, args) => {
        if (err) return;

        socket.emit('control:resume-run', {
            processId,
        });
    },

    handleAbort: (err, args) => {
        if (err) return;

        socket.emit('control:abort-run', {
            processId,
        });
    },
};
