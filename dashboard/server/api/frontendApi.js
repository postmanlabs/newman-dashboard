const {
    ABORT_REQUEST,
    PAUSE_REQUEST,
    RESUME_REQUEST,
} = require('../../lib/constants/socket-events');

const { FRONTEND } = require('../../lib/constants/socket-rooms');

const store = require('../../store');

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

    handleOnConnection: () => {
        socket.to(FRONTEND).emit('initial-data', JSON.stringify(store.get()));
    },

    handleTerminateRequest: () => {
        process.exit(0);
    },

    handleTestConnection: (callback) => {
        callback && callback('dashboard:ping');
    },
});
