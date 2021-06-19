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

// mock the socket.io-client library to return a sinon stub instead
mock('socket.io-client', ioStub);

// require the reporter only after io() has been stubbed
const reporter = require('../../reporter/index');

describe('Reporter event handlers', () => {
    before(() => {
        reporter(mockNewman);
    });

    after(() => {
        // remove the mock on the socket.io-client library
        mock.stop('socket.io-client');
    });

    it('should connect to the broker', () => {
        expect(ioStub.callCount).to.equal(1);
        expect(ioStub.firstCall.args).to.have.lengthOf(1);
        expect(ioStub.firstCall.args[0]).to.equal('http://localhost:5001/');
    });

    it('should handle the start event correctly', (done) => {
        mockSocket.on('control:new-run', (args) => {
            expect(args).to.haveOwnProperty('id');
            expect(args.id).to.have.lengthOf(16);
            done();
        });
        mockNewman.emit('start');
    });

    it('should handle the done event correctly', (done) => {
        mockSocket.on('control:end-run', (args) => {
            expect(args).to.haveOwnProperty('id');
            expect(args.id).to.have.lengthOf(16);
            done();
        });
        mockNewman.emit('done');
    });

    it('should handle the pause event correctly', (done) => {
        mockSocket.on('control:pause-run', (args) => {
            expect(args).to.haveOwnProperty('id');
            expect(args.id).to.have.lengthOf(16);
            done();
        });
        mockNewman.emit('pause');
    });

    it('should handle the resume event correctly', (done) => {
        mockSocket.on('control:resume-run', (args) => {
            expect(args).to.haveOwnProperty('id');
            expect(args.id).to.have.lengthOf(16);
            done();
        });
        mockNewman.emit('resume');
    });

    it('should handle the abort event correctly', (done) => {
        mockSocket.on('control:abort-run', (args) => {
            expect(args).to.haveOwnProperty('id');
            expect(args.id).to.have.lengthOf(16);
            done();
        });
        mockNewman.emit('abort');
    });
});
