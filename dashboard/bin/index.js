const { Command } = require('commander');
const version = require('../package.json').version;
const Server = require('../server');

const launchBroker = require('..');

const program = new Command();

program
    .name('newman-dashboard')
    .addHelpCommand(false)
    .version(version, '-v, --version');

program
    .option(
        '-p, --port <port>',
        'Specify the port to launch the dashboard.',
        '3000'
    )
    .option('-d, --daemonize', 'Run the server as a daemon.')
    .option('-t, --test', 'Run the CLI without any actions for unit tests.')
    .action(() => {
        if (program.opts().test) {
            return;
        }

        if (program.opts().daemonize) {
            // launch the broker as a daemon
            const port = program.opts().port;
            launchBroker(port);
            return;
        }

        Server.init();
    });

// Run this script if this is a direct stdin.
!module.parent && program.parse(process.argv);

// Export to allow debugging and testing.
module.exports = program;
