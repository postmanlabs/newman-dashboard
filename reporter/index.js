const utils = require('./lib/utils/index');

module.exports = function (newman, options, collectionOptions) {
    newman.on('start', utils.handleStart);
};
