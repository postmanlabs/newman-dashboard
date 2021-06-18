const sinon = require('sinon');
const expect = require('chai').expect;
const { EventEmitter } = require('events');

// mock event emitter to simulate newman and socket-client
const mockNewman = new EventEmitter();
const mockSocket = new EventEmitter();

// io() is a default export of socket.io-client; resolve it to export
// a sinon stub instead
require.cache[require.resolve('socket.io-client')] = {
    exports: sinon.stub().callsFake(() => {
        return mockSocket;
    }),
};

// require the reporter only after io() has been stubbed
const reporter = require('../../reporter/index');

describe('Reporter event handlers', () => {
    before(() => {
        reporter(mockNewman);
    });

    it('should handle the start event correctly', (done) => {
        mockSocket.on('control:new-run', (args) => {
            expect(args).to.haveOwnProperty('processId');
            expect(args.processId).to.have.lengthOf(16);
            done();
        });
        mockNewman.emit('start');
    });

    it('should handle the done event correctly', (done) => {
        mockSocket.on('control:end-run', (args) => {
            expect(args).to.haveOwnProperty('processId');
            expect(args.processId).to.have.lengthOf(16);
            done();
        });
        mockNewman.emit('done');
    });
});
