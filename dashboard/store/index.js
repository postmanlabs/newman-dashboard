const Run = require('./models/run');
const Event = require('./models/event');

class Store {
    constructor (initialRuns) {
        this.runs = initialRuns;
    }

    add(data) {
        if(!data.hasOwnProperty('id')) return;

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
};

module.exports = Store;