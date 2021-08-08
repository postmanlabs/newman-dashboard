import {
    action,
    observable,
    computed,
    makeAutoObservable
} from 'mobx';

import Event from './event';

export const RUN_STATUS = {
    ACTIVE: 'active',
    PAUSED: 'paused',
    FINISHED: 'finished',
    ABORTED: 'aborted',
    INTERRUPTED: 'interrupted'
};

export default class RunModel {
    @observable command;
    @observable id;
    @observable startTime;
    @observable status = RUN_STATUS.ACTIVE;
    @observable events = [];
    @observable endTime;
    @observable cpuUsage = [];
    @observable memoryUsage = [];
    socket = null;

    constructor(data, socket) {
        makeAutoObservable(this);

        this._init(data);

        this.socket = socket;

        this.pause = this._emit.bind(this, "pause");
        this.resume = this._emit.bind(this, "resume");
        this.abort = this._emit.bind(this, "abort");
    }

    @computed
    isPaused() {
        return this.status === RUN_STATUS.PAUSED;
    }

    @computed
    isFinished() {
        return this.status === RUN_STATUS.FINISHED;
    }

    @computed
    isAborted() {
        return this.status === RUN_STATUS.ABORTED;
    }

    @action
    _init(data) {
        this.command = data.command;
        this.id = data.id;
        this.startTime = data.startTime;
        this.endTime = 0;
    }

    _emit(eventName) {
        const payload = { id: this.id };

        // TODO: socket should not be coupled with model. Currently we're
        // mixing data and transport layers
        this.socket && this.socket.emit(eventName, payload);
    }

    @action
    setPaused() {
        this.status = RUN_STATUS.PAUSED;
    }

    @action
    setFinished() {
        this.status = RUN_STATUS.FINISHED;
        this.endTime = Date.now();
    }

    @action
    setActive() {
        this.status = RUN_STATUS.ACTIVE;
    }

    @action
    setAborted() {
        this.status = RUN_STATUS.ABORTED;
        this.endTime = Date.now();
    }

    @action
    setInterrupted() {
        this.status = RUN_STATUS.INTERRUPTED;
    }

    @action
    addEvent(data) {
        this.events.push(new Event(data));
    }

    @action
    addRunStats(data) {
        data.cpu &&
            data.memory &&
            this.cpuUsage.push(data.cpu) &&
            this.memoryUsage.push(data.memory);
    }

    @computed
    sortEvents() {
        return this.events.sort(
            (firstEvent, secondEvent) => firstEvent.time < secondEvent.time
        );
    }

    @computed
    averageMemoryUsage() {
        let totalMemory = 0;
        this.memoryUsage.forEach((memory) => {
            totalMemory += memory;
        });

        let avgMemoryB = totalMemory / this.memoryUsage.length;
        let avgMemoryMB = avgMemoryB / 1e6;
        let roundedMemory =
            Math.round((avgMemoryMB + Number.EPSILON) * 100) / 100;

        return roundedMemory;
    }

    @computed
    averageCpuUsage() {
        let totalCpu = 0;
        this.cpuUsage.forEach((cpu) => {
            totalCpu += cpu;
        });

        let avgCpu = totalCpu / this.cpuUsage.length;
        let roundedCpu =
            Math.round((avgCpu + Number.EPSILON) * 100) / 100;

        return roundedCpu;
    }
}
