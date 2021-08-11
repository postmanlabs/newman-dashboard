const expect = require('chai').expect;
const sinon = require('sinon');

// unit to test
const handlers = require('../../../../../dashboard/server/api/runApi');

describe('Run event handlers', () => {
    let socket;
    beforeEach('setup mocks and spies', () => {
        socket = {
            emit: sinon.spy(),
        };
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
        });

        afterEach(() => {
            handleNewRun = null;
        });

        it('should call the socket and callback', () => {
            handleNewRun('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('start');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

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
        });

        afterEach(() => {
            handlePauseRun = null;
        });

        it('should call the socket and callback', () => {
            handlePauseRun('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('pause');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('pause-run');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handleResumeRun', () => {
        let handleResumeRun, sampleCallback;

        beforeEach(() => {
            handleResumeRun = handlers(socket).handleResumeRun;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleResumeRun = null;
        });

        it('should call the socket and callback', () => {
            handleResumeRun('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('resume');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('resume-run');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handleAbortRun', () => {
        let handleAbortRun, sampleCallback;

        beforeEach(() => {
            handleAbortRun = handlers(socket).handleAbortRun;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleAbortRun = null;
        });

        it('should call the socket and callback', () => {
            handleAbortRun('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('abort');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('abort-run');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handleDoneRun', () => {
        let handleDoneRun, sampleCallback;

        beforeEach(() => {
            handleDoneRun = handlers(socket).handleDoneRun;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleDoneRun = null;
        });

        it('should call the socket and callback', () => {
            handleDoneRun('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('done');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('done-run');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handleInterruptRun', () => {
        let handleInterruptRun, sampleCallback;

        beforeEach(() => {
            handleInterruptRun = handlers(socket).handleInterruptRun;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleInterruptRun = null;
        });

        it('should call the socket and callback', () => {
            handleInterruptRun('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('interrupt');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('interrupt-run');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handleRunEvent', () => {
        let handleRunEvent, sampleCallback;

        beforeEach(() => {
            handleRunEvent = handlers(socket).handleRunEvent;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleRunEvent = null;
        });

        it('should call the socket and callback', () => {
            handleRunEvent('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('run-event');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('run-event');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handleRunEvent', () => {
        let handleRunEvent, sampleCallback;

        beforeEach(() => {
            handleRunEvent = handlers(socket).handleRunEvent;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleRunEvent = null;
        });

        it('should call the socket and callback', () => {
            handleRunEvent('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('run-event');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('run-event');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });

    describe('handleRunStats', () => {
        let handleRunStats, sampleCallback;

        beforeEach(() => {
            handleRunStats = handlers(socket).handleRunStats;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleRunStats = null;
        });

        it('should call the socket and callback', () => {
            handleRunStats('abc', sampleCallback);

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('run-stats');
            expect(socket.emit.firstCall.args[1]).to.eql('abc');

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal('run-stats');
            expect(sampleCallback.firstCall.args[1]).to.eql('abc');
        });
    });
});
