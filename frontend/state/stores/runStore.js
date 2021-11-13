import { action, observable, computed, makeAutoObservable } from 'mobx';
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

        try {
            runs.forEach(run => {
                this.add(run);
            });

        } catch(e) {
            return;
        }
    }

    @action
    clear() {
        this.runs = {};
    }

    @action
    add(run) {
        if (run.hasOwnProperty('_id')) run.id = run._id;

        if (!run.hasOwnProperty('id')) return;

        this.runs[run.id] = new Run(run, socket);
    }

    @computed
    find(id) {
        return this.runs[id];
    }

    @computed
    getSortedRuns() {
        return Object.values(this.runs).sort((firstRun, secondRun) => secondRun.endTime - firstRun.endTime);
    }
};

export default new RunStore();
