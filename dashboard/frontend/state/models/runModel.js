import { action, observable, makeObservable } from 'mobx';
import { socket } from '../../pages/_app';

export default class RunModel {
    @observable status;

    constructor(runData) {
        makeObservable(this);
        this.command = runData.command;
        this.id = runData.id;
        this.startTime = runData.startTime;
        this.status = 'active';
    }

    @action emitPause() {
        socket.emit('pause', {
            id: this.id
        });
    }

    @action emitResume() {
        socket.emit('resume', {
            id: this.id
        });
    }

    @action emitAbort() {
        socket.emit('abort', {
            id: this.id
        });
    }
} 