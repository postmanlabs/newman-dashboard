module.exports = {
    handleNewRun: (socket) =>
        function (data) {
            socket.to('frontend').emit('process:start', data);
        },

    handleTestConnection: (cb) => {
        cb('dashboard:ping');
    },
};
