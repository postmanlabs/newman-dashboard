const DB = require('..');

module.exports = {
    addNewRun: async (run) => {
        const runs = await DB.init();
        runs.insert({
            id: run.id,
            command: run.command,
            startTime: run.startTime,
            finishTime: -1,
            status: 'running',
        });
    },

    getAllRuns: async () => {
        const runs = await DB.init();
        return runs.find();
    },

    setRunStatus: async (run, status) => {
        const runs = await DB.init();

        const storedRun = runs.findOne({ id: run.id });
        if (!storedRun) return;
        storedRun.status = status;

        if (status === 'done') {
            storedRun.finishTime = Date.now();
        }

        runs.update(storedRun);
    },
};
