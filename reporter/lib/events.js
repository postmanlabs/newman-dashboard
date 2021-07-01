module.exports = (socket, id) => {
    return {
        handleStart: (err, args) => {
            if (err) {
                // return if any error on starting the run
                return;
            }

            socket.emit('start', {
                id,
            });
        },

        handleDone: (err, args) => {
            if (err) return;

            socket.emit('done', {
                id,
            });
        },

        handlePause: (err, args) => {
            if (err) return;

            socket.emit('pause', {
                id,
            });
        },

        handleResume: (err, args) => {
            if (err) return;

            socket.emit('resume', {
                id,
            });
        },

        handleAbort: (err, args) => {
            if (err) return;

            socket.emit('abort', {
                id,
            });
        },
    };
};
