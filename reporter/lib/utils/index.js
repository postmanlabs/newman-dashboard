const pidusage = require('pidusage');

const utils = {
    generateStartData: (argv, id) => {
        if (!argv || !id) return {};

        const runIndex = argv.indexOf('run');
        const command = runIndex > -1 && argv.slice(runIndex).join(' ');

        return {
            id,
            command,
            startTime: Date.now(),
        };
    },

    getIntervalRunStats: (time, cb) => {
        const interval = setInterval(async () => {
            const stats = await pidusage(process.pid);
            cb(stats);
        }, time);

        // cleanup function to clear the pidusage listeners
        const clear = () => {
            pidusage.clear();
            clearInterval(interval);
        };

        return clear;
    },
};

module.exports = utils;
