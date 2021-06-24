module.exports = (socket) => ({
    handleNewRun: (data, callback) => {
        socket.to('frontend').emit('process:start', data);
        if (callback) {
            callback('new-run', data);
        }
    },

    handlePauseRun: (data, callback) => {
        socket.to('frontend').emit('process:pause', data);
        if (callback) {
            callback('pause-run', data);
        }
    },

    handleResumeRun: (data, callback) => {
        socket.to('frontend').emit('process:resume', data);
        if (callback) {
            callback('resume-run', data);
        }
    },

    handleAbortRun: (data, callback) => {
        socket.to('frontend').emit('process:abort', data);
        if (callback) {
            callback('abort-run', data);
        }
    },

    handleTestConnection: (callback) => {
        callback('dashboard:ping');
    },
});
