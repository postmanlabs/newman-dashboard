const PAUSE_REQUEST = 'pause';
const ABORT_REQUEST = 'abort';
const RESUME_REQUEST = 'resume';

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

    handleTerminateRequest: () => {
        process.exit(0);
    },

    handleTestConnection: (callback) => {
        callback && callback('dashboard:ping');
    },
});
