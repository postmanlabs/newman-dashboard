// establish socket.io server
const socket = require('socket.io');
const Server = require('./server');

const runHandlers = require('./api/runApi');
const frontendHandlers = require('./api/frontendApi');
const utils = require('../lib/utils');

const START_RUN = 'start';
const PAUSE_RUN = 'pause';
const ABORT_RUN = 'abort';
const RESUME_RUN = 'resume';
const DONE_RUN = 'done';
const INTERRUPT_RUN = 'interrupt';
const RUN_EVENT = 'run-event';
const RUN_STATS = 'run-stats';
const TEST_CONN = 'test';

const NEWMAN_RUN = 'newman-run';
const FRONTEND = 'frontend';

const FRONTEND_REQUEST_PAUSE = 'pause';
const FRONTEND_REQUEST_ABORT = 'abort';
const FRONTEND_REQUEST_RESUME = 'resume';
const FRONTEND_REQUEST_TERMINATE = 'terminate';
const FRONTEND_REQUEST_TEST_CONN = 'test';

const init = () => {
    // setup socket.io server
    const server = Server.init();
    const io = socket(server, {
        cors: {
            origin: '*',
        },
    });

    // middleware to extract id from the newman run
    io.use(utils.socketAuth);

    // event listener for a new connection
    io.on('connection', (socket) => {
        if (socket.meta.type === NEWMAN_RUN) {
            const api = runHandlers(socket.to(FRONTEND));

            // push socket to a unique room
            socket.join(`events:${socket.meta.id}`);

            // attach listeners on the socket for run status emits
            socket.on(START_RUN, api.handleNewRun);
            socket.on(PAUSE_RUN, api.handlePauseRun);
            socket.on(ABORT_RUN, api.handleAbortRun);
            socket.on(RESUME_RUN, api.handleResumeRun);
            socket.on(DONE_RUN, api.handleDoneRun);
            socket.on(INTERRUPT_RUN, api.handleInterruptRun);
            socket.on(RUN_EVENT, api.handleRunEvent);
            socket.on(RUN_STATS, api.handleRunStats);

            // test socket connection
            socket.on(TEST_CONN, api.handleTestConnection);
        } else if (socket.meta.type === FRONTEND) {
            // push socket to a frontend room
            socket.join(FRONTEND);

            const api = frontendHandlers(socket);

            // attach listeners on the socket for frontend requests
            socket.on(FRONTEND_REQUEST_PAUSE, api.handlePauseRequest);
            socket.on(FRONTEND_REQUEST_ABORT, api.handleAbortRequest);
            socket.on(FRONTEND_REQUEST_RESUME, api.handleResumeRequest);
            socket.on(FRONTEND_REQUEST_TERMINATE, api.handleTerminateRequest);

            // test socket connection
            socket.on(FRONTEND_REQUEST_TEST_CONN, api.handleTestConnection);
        }
    });

    return { server, io };
};

// Run this script if this is a direct stdin.
!module.parent && init();

// Export to allow debugging and testing.
module.exports = { init };
