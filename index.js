const { Command } = require('commander');
const program = new Command();
const version = require('./package.json').version;
const utils = require('./bin/utils');

program
    .name('newman-dashboard')
    .addHelpCommand(false)
    .version(version, '-v, --version');

program
    .option('-p, --port <port>', 'Specify the port to launch the dashboard')
    .parse(process.argv);
