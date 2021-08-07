// establish express server
const express = require('express');
const path = require('path');

// port for the dashboard
const PORT = 5001;

// initialize express server
const init = () => {
    // initialize express app
    const app = express();

    // serve static files - for the frontend
    app.use(express.static(path.join(__dirname, '../../frontend/out')));

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

    return server;
};

module.exports = { init };
