const Run = require('./models/run');
const Event = require('./models/event');

class Store {
    constructor(initialRuns = {}) {
        this.runs = initialRuns;
    }

    add(data) {
        if (!data.hasOwnProperty('id')) return;

        this.runs[data.id] = new Run(data);
    }

    find(id) {
        return id && this.runs[id];
    }

    clear() {
        this.runs = {};
    }

    get() {
        return this.runs;
    }

    pauseRun(id) {
        const run = id && this.find(id);
        if (!run) return;
        run.setPaused();
    }

    resumeRun(id) {
        const run = id && this.find(id);
        if (!run) return;
        run.setActive();
    }

    abortRun(id) {
        const run = id && this.find(id);
        if (!run) return;
        run.setAborted();
    }

    doneRun(id) {
        const run = id && this.find(id);
        if (!run) return;
        run.setFinished();
    }

    interruptRun(id) {
        const run = id && this.find(id);
        if (!run) return;
        run.setInterrupted();
    }

    addRunEvent(data) {
        const run = data.id && this.find(data.id);
        if (!run) return;
        run.addEvent(data);
    }

    addRunStats(data) {
        const run = data.id && this.find(data.id);
        if (!run) return;
        run.addRunStats(data);
    }
}

module.exports = new Store();
