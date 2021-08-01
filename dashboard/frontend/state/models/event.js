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
        this.parentId = data.id;
        this.time = Date.now();
        this.args = data.args;
    }
}
