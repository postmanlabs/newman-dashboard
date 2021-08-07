const sinon = require('sinon');
const expect = require('chai').expect;

const { EventEmitter } = require('events');
const mock = require('mock-require');

// mock event emitter to simulate newman and socket-client
const mockNewman = new EventEmitter();
const mockSocket = new EventEmitter();

const ioStub = sinon.stub().callsFake(() => {
    return mockSocket;
});

const commands = {
    pause: sinon.spy(),
    resume: sinon.spy(),
    abort: sinon.spy(),
};

// mock the socket.io-client library to return a sinon stub instead
mock('socket.io-client', ioStub);

// unit under test
const reporter = require('../../');

describe('Reporter', () => {
    before(() => {
        reporter(mockNewman, undefined, undefined, commands);
    });

    after(() => {
        // remove the mock on the socket.io-client library
        mock.stop('socket.io-client');
    });

    it('should connect to the broker', () => {
        expect(ioStub.callCount).to.equal(1);
        expect(ioStub.firstCall.args).to.have.lengthOf(2);
        expect(ioStub.firstCall.args[0]).to.equal('http://localhost:5001/');
        expect(ioStub.firstCall.args[1]).to.haveOwnProperty('auth');

        expect(ioStub.firstCall.args[1].auth).to.haveOwnProperty('id');
        expect(ioStub.firstCall.args[1].auth).to.haveOwnProperty('type');
        expect(ioStub.firstCall.args[1].auth.type).to.equal('newman-run');
    });

    it('should handle the pause request correctly', () => {
        mockSocket.emit('pause');
        expect(commands.pause.callCount).to.equal(1);
    });

    it('should handle the resume request correctly', () => {
        mockSocket.emit('resume');
        expect(commands.resume.callCount).to.equal(1);
    });

    it('should handle the abort request correctly', () => {
        mockSocket.emit('abort');
        expect(commands.abort.callCount).to.equal(1);
    });
});
