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
    isActive() {
        return this.status === RUN_STATUS.ACTIVE;
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
    getMemoryUsage() {
        // show live memory stats while run is active
        if (this.isActive() || this.isPaused()) {
            let currMemory = this.memoryUsage[this.memoryUsage.length - 1] / 1e6;
            let roundedMemory = Math.round((currMemory + Number.EPSILON) * 100) / 100;

            return roundedMemory;
        }

        // show average memory stats if run is complete
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
    getCpuUsage() {
        // show live CPU stats while run is active
        if(this.isActive() || this.isPaused()) {
            let currCpu = this.cpuUsage[this.cpuUsage.length - 1];
            let roundedCpu = Math.round((currCpu + Number.EPSILON) * 100) / 100;

            return roundedCpu;
        }

        // show average CPU stats if run is complete
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
