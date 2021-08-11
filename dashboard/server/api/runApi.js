const {
    FRONTEND_ABORT_RUN,
    FRONTEND_NEW_RUN,
    FRONTEND_PAUSE_RUN,
    FRONTEND_RESUME_RUN,
    FRONTEND_RUN_EVENT,
    FRONTEND_DONE_RUN,
    FRONTEND_INTERRUPT_RUN,
    FRONTEND_RUN_STATS,
} = require('../../lib/constants/frontend-events');

const controllers = require('../../lib/controllers/run');

module.exports = (socket) => ({
    handleNewRun: (data, callback) => {
        socket.emit(FRONTEND_NEW_RUN, data);
        controllers.insert(data);

        // acknowledge the received data to client
        callback && callback('new-run', data);
    },

    handlePauseRun: (data, callback) => {
        socket.emit(FRONTEND_PAUSE_RUN, data);
        controllers.pauseRun(data.id);

        callback && callback('pause-run', data);
    },

    handleResumeRun: (data, callback) => {
        socket.emit(FRONTEND_RESUME_RUN, data);
        controllers.resumeRun(data.id);

        callback && callback('resume-run', data);
    },

    handleAbortRun: (data, callback) => {
        socket.emit(FRONTEND_ABORT_RUN, data);
        controllers.abortRun(data.id);

        callback && callback('abort-run', data);
    },

    handleDoneRun: (data, callback) => {
        socket.emit(FRONTEND_DONE_RUN, data);
        controllers.doneRun(data.id);

        callback && callback('done-run', data);
    },

    handleInterruptRun: (data, callback) => {
        socket.emit(FRONTEND_INTERRUPT_RUN, data);
        controllers.interruptRun(data.id);

        callback && callback('interrupt-run', data);
    },

    handleRunEvent: (data, callback) => {
        socket.emit(FRONTEND_RUN_EVENT, data);
        controllers.addRunEvent(data);

        callback && callback('run-event', data);
    },

    handleRunStats: (data, callback) => {
        socket.emit(FRONTEND_RUN_STATS, data);
        controllers.addRunStats(data);

        callback && callback('run-stats', data);
    },

    handleTestConnection: (callback) => {
        callback && callback('dashboard:ping');
    },
});
