const utils = require('../utils');

module.exports = (socket, id) => {
    return {
        handleStart: (err, args) => {
            if (err) return socket.close();

            socket.emit('start', utils.generateStartData(process.argv, id));
        },

        handleDone: (err, args) => {
            if (err) return socket.close();

            socket.emit('done', {
                id,
            });

            // close the client
            socket.close();
        },

        handlePause: (err, args) => {
            if (err) return socket.close();

            socket.emit('pause', {
                id,
            });
        },

        handleResume: (err, args) => {
            if (err) return socket.close();

            socket.emit('resume', {
                id,
            });
        },

        handleAbort: (err, args) => {
            if (err) return socket.close();

            socket.emit('abort', {
                id,
            });
        },

        handleInterrupt: () => {
            socket.emit('interrupt', {
                id,
            });
            socket.hasOwnProperty('close') && socket.close();
        },

        handleRunStats: (stats) => {
            socket.emit('run-stats', {
                runId: id,
                cpu: stats.cpu,
                memory: stats.memory,
            });
        },

        handleRunEvent: (event) => {
            return (err, args) => {
                socket.emit('run-event', {
                    type: event,
                    runId: id,
                    time: Date.now(),
                    args,
                    err,
                });
            };
        },
    };
};
