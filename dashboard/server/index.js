// establish express server
const express = require('express');
const path = require('path');
const cors = require('cors');

// port for the dashboard
const PORT = 5001;

// establish socket.io server
const socket = require('socket.io');

const api = require('./api/server');
const runHandlers = require('./api/runApi');
const frontendHandlers = require('./api/frontendApi');
const utils = require('../lib/utils');

const {
    START_RUN,
    PAUSE_RUN,
    ABORT_RUN,
    RESUME_RUN,
    DONE_RUN,
    INTERRUPT_RUN,
    TEST_CONN,
    RUN_EVENT,
    RUN_STATS,
} = require('../lib/constants/socket-events');
const { NEWMAN_RUN, FRONTEND } = require('../lib/constants/socket-rooms');

const {
    FRONTEND_REQUEST_ABORT,
    FRONTEND_REQUEST_RESUME,
    FRONTEND_REQUEST_PAUSE,
    FRONTEND_REQUEST_TEST_CONN,
    FRONTEND_REQUEST_TERMINATE,
} = require('../lib/constants/frontend-events');

// initialize express server
const init = () => {
    // initialize express app
    const app = express();

    app.use(cors());

    app.get('/api/run', api.getAllRuns);
    app.get('/api/run/:id', api.getRun);

    // serve static files - for the frontend
    app.use(
        '/run/:id',
        express.static(path.join(__dirname, '../../frontend/out/run/[id].html'))
    );
    app.use('/', express.static(path.join(__dirname, '../../frontend/out')));

    // create express server
    const server = app.listen(PORT, () => {
        if (process.hasOwnProperty('send')) {
            // launched as a daemon: emit success message to parent process
            process.send({
                status: 'success',
                message: `\nSUCCESS: Dashboard is up at port ${PORT}.`,
            });
        } else {
            // launched for dev: log success to console
            console.log(`Dashboard is running at port: ${PORT}`);
        }
    });

    // error while creating express server
    server.on('error', (err) => {
        let serverError = '\nERROR: Cannot start dashboard.';

        // if port is busy, create custom error
        if (err.code === 'EADDRINUSE') {
            serverError += `\nPort ${PORT} is busy. 
        Please try again on another port.`;
        } else {
            serverError += `\n${err.message}`;
        }

        if (process.hasOwnProperty('send')) {
            // launched as a daemon: emit failure message to parent process
            process.send({
                status: 'fail',
                message: serverError,
            });
        } else {
            // launched for dev: log error to console
            console.log(serverError);
        }
    });

    // setup socket.io server
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
