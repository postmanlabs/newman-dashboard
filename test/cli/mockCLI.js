const program = require('../../index');

const cli = (args, callback) => {
    const argv = args.split(' ');
    try {
        program.parse(argv);
        return callback(null, program.opts());
    } catch (err) {
        console.log(err);
        return callback(err);
    }
};

module.exports = cli;
