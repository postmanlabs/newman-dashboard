module.exports = {
    handleNewRun: (socket) =>
        function (data) {
            socket.to('frontend').emit('process:start', data);
        },

    handlePauseRun: (socket) =>
        function (data) {
            socket.to('frontend').emit('process:pause', data);
        },

    handleResumeRun: (socket) =>
        function (data) {
            socket.to('frontend').emit('process:resume', data);
        },

    handleAbortRun: (socket) =>
        function (data) {
            socket.to('frontend').emit('process:abort', data);
        },

    handleTestConnection: (cb) => {
        cb('dashboard:ping');
    },
};
