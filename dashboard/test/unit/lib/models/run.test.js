const expect = require('chai').expect;

// unit under test
const Run = require('../../../../lib/models/run');

describe('Run class', () => {
    let currTime = Date.now();

    const mockRunData = {
        command: 'abc',
        id: 'id',
        startTime: currTime,
    };
    let run;

    before(() => {
        run = new Run(mockRunData);
    });

    it('should create the instance correctly', () => {
        expect(run.command).to.equal('abc');
        expect(run.id).to.equal('id');
        expect(run.startTime).to.equal(currTime);

        expect(run.endTime).to.equal(0);
        expect(run.events.length).to.equal(0);
        expect(run.cpuUsage.length).to.equal(0);
        expect(run.memoryUsage.length).to.equal(0);
    });

    describe('Setters and getters', () => {
        describe('setPaused', () => {
            before(() => {
                run.setPaused();
            });

            it('should set the status as paused', () => {
                expect(run.isPaused()).to.be.true;
            });
        });

        describe('setActive', () => {
            before(() => {
                run.setActive();
            });

            it('should set the status as active', () => {
                expect(run.isActive()).to.be.true;
            });
        });

        describe('setInterrupted', () => {
            before(() => {
                run.setInterrupted();
            });

            it('should set the status as interrupted', () => {
                expect(run.isInterrupted()).to.be.true;
            });
        });

        describe('setAborted', () => {
            before(() => {
                run.setAborted();
            });

            it('should set the status as aborted', () => {
                expect(run.isAborted()).to.be.true;
            });
        });

        describe('setFinished', () => {
            before(() => {
                run.setFinished();
            });

            it('should keep the status as aborted if run was aborted', () => {
                expect(run.isAborted()).to.be.true;
            });

            it('should set the status as done if run is active', () => {
                run.setActive();
                run.setFinished();
                expect(run.isFinished()).to.be.true;
            });
        });

        describe('addEvent', () => {
            before(() => {
                run.addEvent({
                    type: 'abc',
                    id: 'id',
                    args: 'sample-args',
                });
            });

            it('should add a new run event', () => {
                expect(run.events.length).to.equal(1);
            });

            it('should mark a run as errored if event has error', () => {
                run.addEvent({
                    type: 'abc',
                    id: 'id',
                    args: 'sample-args',
                    err: 'error',
                });
                expect(run.events.length).to.equal(2);
                expect(run.isInterrupted()).to.be.true;
            });
        });

        describe('addRunStats', () => {
            before(() => {
                run.addRunStats({
                    cpu: 20,
                    memory: 30,
                });
            });

            it('should add a new run stats', () => {
                expect(run.cpuUsage.length).to.equal(1);
                expect(run.memoryUsage.length).to.equal(1);

                expect(run.memoryUsage[0]).to.equal(30);
                expect(run.cpuUsage[0]).to.equal(20);
            });
        });
    });
});
