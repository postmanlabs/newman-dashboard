const utils = require('./lib/utils/index');

module.exports = function (newman, options, collectionOptions) {
    newman.on('start', utils.handleStart);
    newman.on('done', utils.handleDone);

    newman.on('resume', utils.handleResume);
    newman.on('pause', utils.handlePause);
    newman.on('abort', utils.handleAbort);
};
