const expect = require('chai').expect;
const sinon = require('sinon');
const runController = require('../../../../lib/controllers/run');
// unit to test
const handlers = require('../../../../../dashboard/server/api/runApi');

describe('Run event handlers', () => {
    let socket, sampleData;
    beforeEach('setup mocks and spies', () => {
        socket = {
            emit: sinon.spy(),
        };
        sampleData = { id: 'abc' };
    });

    afterEach('cleanup mocks and spies', () => {
        socket = null;
    });

    it('should be a function which takes a socket', () => {
        const api = handlers(socket);
        expect(api).to.be.ok;
    });

    describe('handleNewRun', () => {
        let handleNewRun, sampleCallback;

        beforeEach(() => {
            handleNewRun = handlers(socket).handleNewRun;
            sampleCallback = sinon.spy();
            runController.insert = sinon.spy();
        });

        afterEach(() => {
            handleNewRun = null;
        });

        it('should call the socket and callback', async () => {
            await handleNewRun('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('start');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(runController.insert.calledOnce).to.be.true;
            expect(runController.insert.firstCall.args).to.have.lengthOf(1);
            expect(runController.insert.firstCall.args[0]).to.equal('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('new-run');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handlePauseRun', () => {
        let handlePauseRun, sampleCallback;

        beforeEach(() => {
            handlePauseRun = handlers(socket).handlePauseRun;
            sampleCallback = sinon.spy();
            runController.pause = sinon.spy();
        });

        afterEach(() => {
            handlePauseRun = null;
        });

        it('should call the socket and callback', async () => {
            await handlePauseRun(sampleData, sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('pause');
            expect(socket.emit.firstCall.args[1]).to.deep.equal(sampleData);

            expect(runController.pause.calledOnce).to.be.true;
            expect(runController.pause.firstCall.args).to.have.lengthOf(1);
            expect(runController.pause.firstCall.args[0]).to.equal(
                sampleData.id
            );

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('pause-run');
            expect(sampleCallback.firstCall.args[1]).to.deep.equal(sampleData);
        });
    });

    describe('handleResumeRun', () => {
        let handleResumeRun, sampleCallback;

        beforeEach(() => {
            handleResumeRun = handlers(socket).handleResumeRun;
            sampleCallback = sinon.spy();
            runController.resume = sinon.spy();
        });

        afterEach(() => {
            handleResumeRun = null;
        });

        it('should call the socket and callback', async () => {
            await handleResumeRun(sampleData, sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('resume');
            expect(socket.emit.firstCall.args[1]).to.deep.equal(sampleData);

            expect(runController.resume.calledOnce).to.be.true;
            expect(runController.resume.firstCall.args).to.have.lengthOf(1);
            expect(runController.resume.firstCall.args[0]).to.equal(
                sampleData.id
            );

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('resume-run');
            expect(sampleCallback.firstCall.args[1]).to.deep.equal(sampleData);
        });
    });

    describe('handleAbortRun', () => {
        let handleAbortRun, sampleCallback;

        beforeEach(() => {
            handleAbortRun = handlers(socket).handleAbortRun;
            sampleCallback = sinon.spy();
            runController.abort = sinon.spy();
        });

        afterEach(() => {
            handleAbortRun = null;
        });

        it('should call the socket and callback', async () => {
            await handleAbortRun(sampleData, sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('abort');
            expect(socket.emit.firstCall.args[1]).to.deep.equal(sampleData);

            expect(runController.abort.calledOnce).to.be.true;
            expect(runController.abort.firstCall.args).to.have.lengthOf(1);
            expect(runController.abort.firstCall.args[0]).to.equal(
                sampleData.id
            );

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('abort-run');
            expect(sampleCallback.firstCall.args[1]).to.deep.equal(sampleData);
        });
    });

    describe('handleDoneRun', () => {
        let handleDoneRun, sampleCallback;

        beforeEach(() => {
            handleDoneRun = handlers(socket).handleDoneRun;
            sampleCallback = sinon.spy();
            runController.done = sinon.spy();
        });

        afterEach(() => {
            handleDoneRun = null;
        });

        it('should call the socket and callback', async () => {
            await handleDoneRun(sampleData, sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('done');
            expect(socket.emit.firstCall.args[1]).to.deep.equal(sampleData);

            expect(runController.done.calledOnce).to.be.true;
            expect(runController.done.firstCall.args).to.have.lengthOf(1);
            expect(runController.done.firstCall.args[0]).to.equal(
                sampleData.id
            );

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('done-run');
            expect(sampleCallback.firstCall.args[1]).to.deep.equal(sampleData);
        });
    });

    describe('handleInterruptRun', () => {
        let handleInterruptRun, sampleCallback;

        beforeEach(() => {
            handleInterruptRun = handlers(socket).handleInterruptRun;
            sampleCallback = sinon.spy();
            runController.interrupt = sinon.spy();
        });

        afterEach(() => {
            handleInterruptRun = null;
        });

        it('should call the socket and callback', async () => {
            await handleInterruptRun(sampleData, sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('interrupt');
            expect(socket.emit.firstCall.args[1]).to.deep.equal(sampleData);

            expect(runController.interrupt.calledOnce).to.be.true;
            expect(runController.interrupt.firstCall.args).to.have.lengthOf(1);
            expect(runController.interrupt.firstCall.args[0]).to.equal(
                sampleData.id
            );

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('interrupt-run');
            expect(sampleCallback.firstCall.args[1]).to.deep.equal(sampleData);
        });
    });

    describe('handleRunEvent', () => {
        let handleRunEvent, sampleCallback;

        beforeEach(() => {
            handleRunEvent = handlers(socket).handleRunEvent;
            sampleCallback = sinon.spy();
            runController.addEvent = sinon.spy();
        });

        afterEach(() => {
            handleRunEvent = null;
        });

        it('should call the socket and callback', async () => {
            await handleRunEvent(sampleData, sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('run-event');
            expect(socket.emit.firstCall.args[1]).to.deep.equal(sampleData);

            expect(runController.addEvent.calledOnce).to.be.true;
            expect(runController.addEvent.firstCall.args).to.have.lengthOf(1);
            expect(runController.addEvent.firstCall.args[0]).to.equal(
                sampleData
            );

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('run-event');
            expect(sampleCallback.firstCall.args[1]).to.deep.equal(sampleData);
        });
    });

    describe('handleRunStats', () => {
        let handleRunStats, sampleCallback;

        beforeEach(() => {
            handleRunStats = handlers(socket).handleRunStats;
            sampleCallback = sinon.spy();
            runController.addStats = sinon.spy();
        });

        afterEach(() => {
            handleRunStats = null;
        });

        it('should call the socket and callback', async () => {
            await handleRunStats(sampleData, sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('run-stats');
            expect(socket.emit.firstCall.args[1]).to.deep.equal(sampleData);

            expect(runController.addStats.calledOnce).to.be.true;
            expect(runController.addStats.firstCall.args).to.have.lengthOf(1);
            expect(runController.addStats.firstCall.args[0]).to.equal(
                sampleData
            );

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('run-stats');
            expect(sampleCallback.firstCall.args[1]).to.deep.equal(sampleData);
        });
    });
});
