const Run = require('../models/run');
const Event = require('../models/event');
const RunStat = require('../models/runStat');
const BatchQueue = require('./batchQueue');

const api = {
    insert: async (data) => {
        if (!data.id) throw new TypeError('Invalid run data');

        const runDocument = Run.create(data);
        const run = await runDocument.save();

        if (!run)
            throw new Error('Unable to save run data. Incoherent schema.');
    },

    pause: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await Run.findOne({ _id: id });

        if (!run) throw new Error('Run not found.');

        run.status = 'paused';
        await run.save();
    },

    resume: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await Run.findOne({ _id: id });

        if (!run) throw new Error('Run not found.');

        run.status = 'active';
        await run.save();
    },

    abort: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await Run.findOne({ _id: id });

        if (!run) throw new Error('Run not found.');

        run.status = 'aborted';
        run.endTime = Date.now();
        await run.save();
    },

    done: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await Run.findOne({ _id: id });

        if (!run) throw new Error('Run not found.');

        if (run.status === 'aborted') return;

        run.status = 'finished';
        run.endTime = Date.now();
        await run.save();
    },

    interrupt: async (id) => {
        if (!id) throw new TypeError('Invalid id');
        const run = await Run.findOne({ _id: id });

        if (!run) throw new Error('Run not found.');

        run.status = 'interrupted';
        await run.save();
    },

    saveEvent: async (data) => {
        if (!data.runId) throw new TypeError('Invalid parent id');

        const event = Event.create(data);
        if (!event) throw new Error('Invalid event type');
        await event.save();
    },

    saveStats: async (data) => {
        if (!data.runId) throw new TypeError('Invalid parent id');

        const stat = RunStat.create(data);
        if (!stat) throw new Error('Invalid stat type');

        await stat.save();
    },

    addEvent: async (data) => {
        const batch = new BatchQueue(api.saveEvent);
        batch.add(data);
    },

    addStats: async (data) => {
        const batch = new BatchQueue(api.saveStats);
        batch.add(data);
    },
};

module.exports = api;
