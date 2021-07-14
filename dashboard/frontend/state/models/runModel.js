import { action, observable } from 'mobx';

export default class RunModel {
    @observable title;
    @observable finished = false;
    @observable status;

    constructor(runData) {
        this.title = runData.title;
        this.id = runData.id;
        this.timestamp = runData.timestamp;
        this.status = runData.status;
    }
} 