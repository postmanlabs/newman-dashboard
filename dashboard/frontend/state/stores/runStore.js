import { action, observable, makeObservable } from 'mobx';
import { socket } from '../../pages/_app';
import Run from '../models/runModel';

class RunStore {
    @observable runs = [];

    constructor(initialData = []) {
        makeObservable(this);
        this.hydrate(initialData);
    }

    @action
    hydrate(runs) {
        this.clear();

        Array.isArray(runs) && runs.forEach((run) => this.add(run));
    }

    @action
    clear() {
        this.run = [];
    }

    @action
    add(run) {
        this.runs.push(new Run(run, socket));
    }

    @action
    find(id) {
        return this.runs.find((run) => run.id === id);
    }
};

export default RunStore;
