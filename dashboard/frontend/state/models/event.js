import {
    action,
    observable,
    makeObservable
} from 'mobx';

export default class EventModel {
    @observable type;
    @observable args;

    constructor(data) {
        makeObservable(this);
        this._init(data);
    }

    @action
    _init(data) {
        this.type = data.type;
        this.time = data.time;
        this.args = data.args;
    }
}
