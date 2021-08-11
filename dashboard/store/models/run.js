const Event = require('./event');

const RUN_STATUS = {
    ACTIVE: 'active',
    PAUSED: 'paused',
    FINISHED: 'finished',
    ABORTED: 'aborted',
    INTERRUPTED: 'interrupted',
};

class Run {
    constructor(data) {
        this._init(data);
    }

    _init(data) {
        this.command = data.command;
        this.id = data.id;

        this.startTime = data.startTime;
        this.endTime = 0;

        this.events = [];
        this.cpuUsage = [];
        this.memoryUsage = [];
    }

    // setters
    setPaused() {
        this.status = RUN_STATUS.PAUSED;
    }

    setFinished() {
        this.status = RUN_STATUS.FINISHED;
        this.endTime = Date.now();
    }

    setActive() {
        this.status = RUN_STATUS.ACTIVE;
    }

    setAborted() {
        this.status = RUN_STATUS.ABORTED;
        this.endTime = Date.now();
    }

    setInterrupted() {
        this.status = RUN_STATUS.INTERRUPTED;
    }

    addEvent(data) {
        this.events.push(new Event(data));
    }

    addRunStats(data) {
        data.cpu &&
            data.memory &&
            this.cpuUsage.push(data.cpu) &&
            this.memoryUsage.push(data.memory);
    }

    // getters
    isPaused() {
        return this.status === RUN_STATUS.PAUSED;
    }

    isFinished() {
        return this.status === RUN_STATUS.FINISHED;
    }

    isActive() {
        return this.status === RUN_STATUS.ACTIVE;
    }

    isAborted() {
        return this.status === RUN_STATUS.ABORTED;
    }
}

module.exports = Run;
