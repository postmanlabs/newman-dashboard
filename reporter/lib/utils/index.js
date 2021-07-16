module.exports = {
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
};
