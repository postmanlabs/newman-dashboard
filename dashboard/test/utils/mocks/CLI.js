const program = require('../../../bin');

const cli = (args, callback) => {
    const argv = args.split(' ');
    argv.push('-t');

    try {
        program.parse(argv);

        return callback(null, program.opts());
    } catch (err) {
        return callback(err);
    }
};

module.exports = cli;
