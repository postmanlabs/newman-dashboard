const expect = require('chai').expect;
const sinon = require('sinon');

// unit under test
const events = require('../../../../reporter/lib/events');

describe('Reporter events', () => {
    let socket;

    beforeEach('setup mocks and spies', () => {
        socket = {
            emit: sinon.spy(),
        };
    });

    afterEach('cleanup mocks and spies', () => {
        socket = null;
    });

    it('should be a function which takes socket and id', () => {
        const handlers = events(socket, 'abc');

        expect(handlers).to.be.ok;
    });

    describe('handleStart', () => {
        let handleStart;

        beforeEach(() => {
            handleStart = events(socket, 'abc').handleStart;
        });

        afterEach(() => {
            handleStart = null;
        });

        it('should call the socket', () => {
            handleStart();

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('start');
            expect(socket.emit.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should handle error', () => {
            handleStart(new Error('error in start'));

            expect(socket.emit.called).to.be.false;
        });
    });

    describe('handleDone', () => {
        let handleDone;

        beforeEach(() => {
            handleDone = events(socket, 'abc').handleDone;
        });

        afterEach(() => {
            handleDone = null;
        });

        it('should call the socket', () => {
            handleDone();

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('done');
            expect(socket.emit.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should handle error', () => {
            handleDone(new Error('error in done'));

            expect(socket.emit.called).to.be.false;
        });
    });

    describe('handlePause', () => {
        let handlePause;

        beforeEach(() => {
            handlePause = events(socket, 'abc').handlePause;
        });

        afterEach(() => {
            handlePause = null;
        });

        it('should call the socket', () => {
            handlePause();

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('pause');
            expect(socket.emit.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should handle error', () => {
            handlePause(new Error('error in pause'));

            expect(socket.emit.called).to.be.false;
        });
    });

    describe('handleResume', () => {
        let handleResume;

        beforeEach(() => {
            handleResume = events(socket, 'abc').handleResume;
        });

        afterEach(() => {
            handleResume = null;
        });

        it('should call the socket', () => {
            handleResume();

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('resume');
            expect(socket.emit.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should handle error', () => {
            handleResume(new Error('error in resume'));

            expect(socket.emit.called).to.be.false;
        });
    });

    describe('handleAbort', () => {
        let handleAbort;

        beforeEach(() => {
            handleAbort = events(socket, 'abc').handleAbort;
        });

        afterEach(() => {
            handleAbort = null;
        });

        it('should call the socket', () => {
            handleAbort();

            expect(socket.emit.calledOnce).to.be.true;
            expect(socket.emit.firstCall.args).to.have.lengthOf(2);
            expect(socket.emit.firstCall.args[0]).to.equal('abort');
            expect(socket.emit.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should handle error', () => {
            handleAbort(new Error('error in abort'));

            expect(socket.emit.called).to.be.false;
        });
    });
});
