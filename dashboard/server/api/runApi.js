const {
    FRONTEND_ABORT_RUN,
    FRONTEND_NEW_RUN,
    FRONTEND_PAUSE_RUN,
    FRONTEND_RESUME_RUN,
    FRONTEND_RUN_EVENT,
} = require('../../lib/constants/frontend-events');

module.exports = (socket) => ({
    handleNewRun: (data, callback) => {
        socket.emit(FRONTEND_NEW_RUN, data);
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

    handleRunEvent: (data, callback) => {
        socket.emit(FRONTEND_RUN_EVENT, data);
        callback && callback('run-event', data);
    },

    handleTestConnection: (callback) => {
        callback && callback('dashboard:ping');
    },
});
