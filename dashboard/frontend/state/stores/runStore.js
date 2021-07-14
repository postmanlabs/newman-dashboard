import { action, makeObservable, observable } from 'mobx';
import Run from '../models/runModel';

class RunStore {
    @observable runs = [];

    constructor(initialData = []) {
        makeObservable(this);
        this.runs = initialData;
    }

    @action newRun(run) {
        this.runs.push(new Run(run));
    }

    @action setRuns(runs) {
        this.runs = runs;
    }

    @action updateRunStatus(data, status) {
        this.runs.filter((run) => {
            if(run.id === data.id) {
                run.status = status;
            }
        })
    }

    @action setRunFinished(data) {
        this.runs.filter((run) => {
            if(run.id === data.id) {
                run.finished = true;
            }
        })
    }
};

export default RunStore;