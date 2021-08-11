const Run = require('../models/run');
const db = require('../store');
const { asyncWrapper } = require('../utils');

const runs = db.getTable('runs');

const api = {
    insert: asyncWrapper(async (data) => {
        await runs.insert(data.id, new Run(data));
    }),

    findOne: asyncWrapper(async (id) => {
        return id && await runs.findOne(id);
    }),

    find: asyncWrapper(async () => {
        return await runs.find();
    }),

    clear: asyncWrapper(async () => {
        return await runs.clear();
    }),

    pauseRun: asyncWrapper(async (id) => {
        const run = id && await api.findOne(id);
        if (!run) return;
        run.setPaused();
    }),

    resumeRun: asyncWrapper(async (id) => {
        const run = id && await api.findOne(id);
        if (!run) return;
        run.setActive();
    }),

    abortRun: asyncWrapper(async (id) => {
        const run = id && await api.findOne(id);
        if (!run) return;
        run.setAborted();
    }),

    doneRun: asyncWrapper(async (id) => {
        const run = id && await api.findOne(id);
        if (!run) return;
        run.setFinished();
    }),

    interruptRun: asyncWrapper(async (id) => {
        const run = id && await api.findOne(id);
        if (!run) return;
        run.setInterrupted();
    }),

    addRunEvent: asyncWrapper(async (data) => {
        const run = data.id && await api.findOne(data.id);
        if (!run) return;
        run.addEvent(data);
    }),

    addRunStats: asyncWrapper(async (data) => {
        const run = data.id && await api.findOne(data.id);
        if (!run) return;
        run.addRunStats(data);
    }),
}

module.exports = api;