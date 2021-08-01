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
};

export default class RunModel {
    @observable command;
    @observable id;
    @observable startTime;
    @observable status = RUN_STATUS.ACTIVE;
    @observable events = [];
    @observable endTime;
    socket = null;

    constructor(data, socket) {
        makeAutoObservable(this);

        this._init(data);

        this.socket = socket;

        this.pause = this._emit.bind(this, 'pause');
        this.resume = this._emit.bind(this, 'resume');
        this.abort = this._emit.bind(this, 'abort');
    }

    @computed
    isPaused() {
        return this.status === RUN_STATUS.PAUSED;
    }

    @computed
    isFinished() {
        return this.status === RUN_STATUS.FINISHED;
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
    newEvent(data) {
        this.events.push(new Event(data));
    }
}
