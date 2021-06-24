module.exports = (socket, id) => {
    return {
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
};
