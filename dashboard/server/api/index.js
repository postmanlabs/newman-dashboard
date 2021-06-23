module.exports = {
    handleNewRun: (socket) =>
        function (data, callback) {
            socket.to('frontend').emit('process:start', data);
            if (callback) {
                callback('new-run', data);
            }
        },

    handlePauseRun: (socket) =>
        function (data, callback) {
            socket.to('frontend').emit('process:pause', data);
            if (callback) {
                callback('pause-run', data);
            }
        },

    handleResumeRun: (socket) =>
        function (data, callback) {
            socket.to('frontend').emit('process:resume', data);
            if (callback) {
                callback('resume-run', data);
            }
        },

    handleAbortRun: (socket) =>
        function (data, callback) {
            socket.to('frontend').emit('process:abort', data);
            if (callback) {
                callback('abort-run', data);
            }
        },

    handleTestConnection: (cb) => {
        cb('dashboard:ping');
    },
};
