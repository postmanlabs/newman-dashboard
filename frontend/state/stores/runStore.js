import { action, observable, makeAutoObservable } from 'mobx';
import { socket } from '../../pages/_app';
import Run from '../models/run';

class RunStore {
    @observable runs = {};

    constructor(initialData = []) {
        makeAutoObservable(this);
    }

    @action
    hydrate(runs) {
        this.clear();

        Array.isArray(runs) && runs.forEach((run) => this.add(run));
    }

    @action
    clear() {
        this.runs = {};
    }

    @action
    add(run) {
        if(!run.hasOwnProperty('id')) return;

        this.runs[run.id] = new Run(run, socket);
    }

    @action
    find(id) {
        return this.runs[id];
    }

    @action 
    getSortedRuns() {
        return Object.values(this.runs).sort((firstRun, secondRun) => {
            firstRun.endTime < secondRun.endTime;
        });
    }
};

export default RunStore;
