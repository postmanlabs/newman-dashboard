module.exports = (socket) => ({
    handleNewRun: (data, callback) => {
        socket.emit('process:start', data);
        // acknowledge the received data to client
        callback && callback('new-run', data);
    },

    handlePauseRun: (data, callback) => {
        socket.emit('process:pause', data);
        callback && callback('pause-run', data);
    },

    handleResumeRun: (data, callback) => {
        socket.emit('process:resume', data);
        callback && callback('resume-run', data);
    },

    handleAbortRun: (data, callback) => {
        socket.emit('process:abort', data);
        callback && callback('abort-run', data);
    },

    handleTestConnection: (callback) => {
        callback && callback('dashboard:ping');
    },
});
