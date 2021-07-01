const {
    ABORT_REQUEST,
    PAUSE_REQUEST,
    RESUME_REQUEST,
} = require('../../lib/constants/socket-events');

module.exports = (socket) => ({
    handlePauseRequest: (data, callback) => {
        if (!data.hasOwnProperty('id')) {
            return callback && callback('Invalid data format.');
        }
        socket.to(`events:${data.id}`).emit(PAUSE_REQUEST, data);
        callback && callback(undefined, data);
    },

    handleResumeRequest: (data, callback) => {
        if (!data.hasOwnProperty('id')) {
            return callback && callback('Invalid data format.');
        }
        socket.to(`events:${data.id}`).emit(RESUME_REQUEST, data);
        callback && callback(undefined, data);
    },

    handleAbortRequest: (data, callback) => {
        if (!data.hasOwnProperty('id')) {
            return callback && callback('Invalid data format.');
        }
        socket.to(`events:${data.id}`).emit(ABORT_REQUEST, data);
        callback && callback(undefined, data);
    },
});
