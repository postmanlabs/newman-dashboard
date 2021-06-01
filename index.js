const { Command } = require('commander');
const program = new Command();
const version = require('./package.json').version;

const launchBroker = require('./bin/broker/index');

program
    .name('newman-dashboard')
    .addHelpCommand(false)
    .version(version, '-v, --version');

program
    .option('-p, --port <port>', 'Specify the port to launch the dashboard')
    .parse(process.argv);

// launch the broker as a daemon
const port = program.opts().port || 3000;
launchBroker(port);
