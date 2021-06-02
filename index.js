const { Command } = require('commander');
const program = new Command();
const version = require('./package.json').version;

const launchBroker = require('./bin/broker/index');

program
    .name('newman-dashboard')
    .addHelpCommand(false)
    .version(version, '-v, --version');

program
    .option(
        '-p, --port <port>',
        'Specify the port to launch the dashboard',
        '3000'
    )
    .action(() => {
        if (process.env.NODE_ENV !== 'test') {
            // launch the broker as a daemon
            const port = program.opts().port;
            launchBroker(port);
        }
    })
    .parse(process.argv);

module.exports = program;
