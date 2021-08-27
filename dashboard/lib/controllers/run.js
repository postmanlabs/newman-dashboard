const Run = require('../models/run');
const db = require('../store');

const api = {
    insert: async (data) => {
        const runs = await db.getTable('runs');
        await runs.insert(data.id, new Run(data));
    },

    findOne: async (id) => {
        const runs = await db.getTable('runs');

        if (!id) throw new TypeError('Invalid id');
        return runs.findOne(id);
    },

    find: async () => {
        const runs = await db.getTable('runs');
        return runs.find();
    },

    clear: async () => {
        const runs = await db.getTable('runs');
        return runs.clear();
    },

    pause: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await api.findOne(id);

        if (!run) throw new Error('Run not found.');
        run.setPaused();
    },

    resume: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await api.findOne(id);

        if (!run) throw new Error('Run not found.');
        run.setActive();
    },

    abort: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await api.findOne(id);

        if (!run) throw new Error('Run not found.');
        run.setAborted();
    },

    done: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await api.findOne(id);

        if (!run) throw new Error('Run not found.');
        run.setFinished();
    },

    interrupt: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await api.findOne(id);

        if (!run) throw new Error('Run not found.');
        run.setInterrupted();
    },

    addEvent: async (data) => {
        if (!data.id) throw new TypeError('Invalid id');
        const run = await api.findOne(data.id);

        if (!run) throw new Error('Run not found.');
        run.addEvent(data);
    },

    addStats: async (data) => {
        if (!data.id) throw new TypeError('Invalid id');
        const run = await api.findOne(data.id);

        if (!run) throw new Error('Run not found.');
        run.addRunStats(data);
    },
};

module.exports = api;
