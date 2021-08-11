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

const { asyncWrapper } = require('../../lib/utils');
const controllers = require('../../lib/controllers/run');

module.exports = (socket) => ({
    handleNewRun: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_NEW_RUN, data);
        await controllers.insert(data);

        // acknowledge the received data to client
        callback && callback('new-run', data);
    }),

    handlePauseRun: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_PAUSE_RUN, data);
        await controllers.pauseRun(data.id);

        callback && callback('pause-run', data);
    }),

    handleResumeRun: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_RESUME_RUN, data);
        await controllers.resumeRun(data.id);

        callback && callback('resume-run', data);
    }),

    handleAbortRun: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_ABORT_RUN, data);
        await controllers.abortRun(data.id);

        callback && callback('abort-run', data);
    }),

    handleDoneRun: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_DONE_RUN, data);
        await controllers.doneRun(data.id);

        callback && callback('done-run', data);
    }),

    handleInterruptRun: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_INTERRUPT_RUN, data);
        await controllers.interruptRun(data.id);

        callback && callback('interrupt-run', data);
    }),

    handleRunEvent: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_RUN_EVENT, data);
        await controllers.addRunEvent(data);

        callback && callback('run-event', data);
    }),

    handleRunStats: asyncWrapper(async (data, callback) => {
        socket.emit(FRONTEND_RUN_STATS, data);
        await controllers.addRunStats(data);

        callback && callback('run-stats', data);
    }),

    handleTestConnection: (callback) => {
        callback && callback('dashboard:ping');
    },
});
