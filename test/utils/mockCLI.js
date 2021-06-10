const program = require('../../bin/index');

const cli = (args, callback) => {
    let argv = args.split(' ');
    argv.push('--test');

    try {
        program.parse(argv);
        return callback(null, program.opts());
    } catch (err) {
        return callback(err);
    }
};

module.exports = cli;
