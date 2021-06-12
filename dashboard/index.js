// launch the dashboard broker as a daemon
const cp = require('child_process');
const utils = require('./lib/utils/index');
const mocks = require('./lib/mocks/index');

const launchBroker = (port, isTest = false) => {
    if (!utils.validPortNumber(port)) {
        throw new Error('Invalid port number.');
    }

    let brokerProcess;

    if (!isTest) {
        // spawn the broker as a child process
        brokerProcess = cp.spawn(
            process.execPath,
            ['./dashboard/server/index.js'],
            {
                detached: true,
                // runs the child process independently of parent
                stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
                // disconnect all pipes except for ipc
                // ['stdin', 'stdout', 'stderr', 'ipc']
            }
        );
    } else {
        brokerProcess = mocks.mockSpawn(
            process.execPath,
            ['./dashboard/server/index.js'],
            {
                detached: true,
                stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
            }
        );
    }

    // listen to emits by the broker regarding launch of server
    brokerProcess.on('message', (data) => {
        // log the message to the console
        console.log(data.message);

        // disconnect the IPC channel
        brokerProcess.unref();
        brokerProcess.disconnect();

        if (!isTest) {
            // clean exit the process
            process.exit(0);
        }
    });

    return brokerProcess;
};

module.exports = launchBroker;
