const Run = require('../models/run');
const db = require('../store');

const runs = db.getTable('runs');

const api = {
    insert: async (data) => {
        runs.insert(new Run(data));
    },

    findOne: async (id) => {
        return id && runs.findOne(id);
    },

    find: async () => {
        return runs.find();
    },

    clear: async () => {
        return runs.clear();
    },

    pauseRun: async (id) => {
        const run = id && this.find(id);
        if (!run) return;
        run.setPaused();
    },

    resumeRun: async (id) => {
        const run = id && this.find(id);
        if (!run) return;
        run.setActive();
    },

    abortRun: async (id) => {
        const run = id && this.find(id);
        if (!run) return;
        run.setAborted();
    },

    doneRun: async (id) => {
        const run = id && this.find(id);
        if (!run) return;
        run.setFinished();
    },

    interruptRun: async (id) => {
        const run = id && this.find(id);
        if (!run) return;
        run.setInterrupted();
    },

    addRunEvent: async (data) => {
        const run = data.id && this.find(data.id);
        if (!run) return;
        run.addEvent(data);
    },

    addRunStats: async (data) => {
        const run = data.id && this.find(data.id);
        if (!run) return;
        run.addRunStats(data);
    },
}

module.exports = api;