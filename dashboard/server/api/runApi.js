const {
    FRONTEND_ABORT_RUN,
    FRONTEND_NEW_RUN,
    FRONTEND_PAUSE_RUN,
    FRONTEND_RESUME_RUN,
} = require('../../lib/constants/frontend-events');

const dbApi = require('../../store/controllers');

module.exports = (socket) => ({
    handleNewRun: async (data, callback) => {
        socket.emit(FRONTEND_NEW_RUN, data);

        await dbApi.addNewRun(data);

        // acknowledge the received data to client
        callback && callback('new-run', data);
    },

    handlePauseRun: (data, callback) => {
        socket.emit(FRONTEND_PAUSE_RUN, data);
        callback && callback('pause-run', data);
    },

    handleResumeRun: (data, callback) => {
        socket.emit(FRONTEND_RESUME_RUN, data);
        callback && callback('resume-run', data);
    },

    handleAbortRun: (data, callback) => {
        socket.emit(FRONTEND_ABORT_RUN, data);
        callback && callback('abort-run', data);
    },

    handleTestConnection: (callback) => {
        callback && callback('dashboard:ping');
    },
});
