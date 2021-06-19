const events = require('./lib/events');

module.exports = function (newman, options, collectionOptions) {
    newman.on('start', events.handleStart);
    newman.on('done', events.handleDone);

    newman.on('resume', events.handleResume);
    newman.on('pause', events.handlePause);
    newman.on('abort', events.handleAbort);
};
