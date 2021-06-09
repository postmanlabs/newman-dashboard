// launch the dashboard broker as a daemon
const cp = require('child_process');
const utils = require('./lib/utils/index');

const launchBroker = (port) => {
    if (!utils.validPortNumber(port)) {
        throw new Error('Invalid port number.');
    }

    // TODO: Write port number to metadata file

    // spawn the broker as a child process
    const brokerProcess = cp.spawn(
        process.execPath,
        ['./bin/broker/server.js'],
        {
            detached: true, // runs the child process independently of parent
            stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
            // disconnect all pipes except for ipc
            // ['stdin', 'stdout', 'stderr', 'ipc']
        }
    );

    // listen to emits by the broker regarding launch of server
    brokerProcess.on('message', (data) => {
        // log the message to the console
        console.log(data.message);

        // disconnect the IPC channel
        brokerProcess.unref();
        brokerProcess.disconnect();

        // clean exit the process
        process.exit(0);
    });
};

module.exports = launchBroker;
