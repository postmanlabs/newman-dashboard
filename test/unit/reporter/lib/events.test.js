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
            expect(socket.emit.firstCall.args[0]).to.equal('control:new-run');
            expect(socket.emit.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should handle error', () => {
            handleStart(new Error('error in start'));

            expect(socket.emit.called).to.be.false;
        });
    });

    describe('handleDone', () => {
        it('should call the socket');
        it('should handle error');
    });

    describe('handlePause', () => {
        it('should call the socket');
        it('should handle error');
    });

    describe('handleResume', () => {
        it('should call the socket');
        it('should handle error');
    });

    describe('handleAbort', () => {
        it('should call the socket');
        it('should handle error');
    });
});
