const expect = require('chai').expect;
const sinon = require('sinon');

// unit to test
const handlers = require('../../../dashboard/server/api/frontendApi');
const emitSpy = sinon.spy();

describe('Broker frontend event handlers', () => {
    let socket;
    beforeEach('setup mocks and spies', () => {
        socket = {
            to: () => ({
                emit: emitSpy,
            }),
        };
    });

    afterEach('cleanup mocks and spies', () => {
        socket = null;
    });

    it('should be a function which takes a socket', () => {
        const api = handlers(socket);
        expect(api).to.be.ok;
    });

    describe('handlePauseRequest', () => {
        let handlePauseRequest, sampleCallback;

        beforeEach(() => {
            emitSpy.resetHistory();
            handlePauseRequest = handlers(socket).handlePauseRequest;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handlePauseRequest = null;
        });

        it('should call the socket and callback', () => {
            handlePauseRequest({ id: 'abc' }, sampleCallback);

            expect(emitSpy.calledOnce).to.be.true;
            expect(emitSpy.firstCall.args).to.have.lengthOf(2);
            expect(emitSpy.firstCall.args[0]).to.equal('pause');
            expect(emitSpy.firstCall.args[1]).to.eql({ id: 'abc' });

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal(undefined);
            expect(sampleCallback.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should error if id is not present', () => {
            handlePauseRequest('abc', sampleCallback);

            expect(emitSpy.calledOnce).to.be.false;

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(1);
            expect(sampleCallback.firstCall.args[0]).to.equal(
                'Invalid data format.'
            );
        });
    });

    describe('handleResumeRequest', () => {
        let handleResumeRequest, sampleCallback;

        beforeEach(() => {
            emitSpy.resetHistory();
            handleResumeRequest = handlers(socket).handleResumeRequest;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleResumeRequest = null;
        });

        it('should call the socket and callback', () => {
            handleResumeRequest({ id: 'abc' }, sampleCallback);

            expect(emitSpy.calledOnce).to.be.true;
            expect(emitSpy.firstCall.args).to.have.lengthOf(2);
            expect(emitSpy.firstCall.args[0]).to.equal('resume');
            expect(emitSpy.firstCall.args[1]).to.eql({ id: 'abc' });

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal(undefined);
            expect(sampleCallback.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should error if id is not present', () => {
            handleResumeRequest('abc', sampleCallback);

            expect(emitSpy.calledOnce).to.be.false;

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(1);
            expect(sampleCallback.firstCall.args[0]).to.equal(
                'Invalid data format.'
            );
        });
    });

    describe('handleAbortRequest', () => {
        let handleAbortRequest, sampleCallback;

        beforeEach(() => {
            emitSpy.resetHistory();
            handleAbortRequest = handlers(socket).handleAbortRequest;
            sampleCallback = sinon.spy();
        });

        afterEach(() => {
            handleAbortRequest = null;
        });

        it('should call the socket and callback', () => {
            handleAbortRequest({ id: 'abc' }, sampleCallback);

            expect(emitSpy.calledOnce).to.be.true;
            expect(emitSpy.firstCall.args).to.have.lengthOf(2);
            expect(emitSpy.firstCall.args[0]).to.equal('abort');
            expect(emitSpy.firstCall.args[1]).to.eql({ id: 'abc' });

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(2);
            expect(sampleCallback.firstCall.args[0]).to.equal(undefined);
            expect(sampleCallback.firstCall.args[1]).to.eql({ id: 'abc' });
        });

        it('should error if id is not present', () => {
            handleAbortRequest('abc', sampleCallback);

            expect(emitSpy.calledOnce).to.be.false;

            expect(sampleCallback.calledOnce).to.be.true;
            expect(sampleCallback.firstCall.args).to.have.lengthOf(1);
            expect(sampleCallback.firstCall.args[0]).to.equal(
                'Invalid data format.'
            );
        });
    });
});
