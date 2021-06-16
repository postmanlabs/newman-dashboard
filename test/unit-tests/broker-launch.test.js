const sinon = require('sinon');
const cp = require('child_process');
const { EventEmitter } = require('events');
const expect = require('chai').expect;

const launchBroker = require('../../dashboard/index');

// mock event emitter to simulate ChildProcess object
const mockChildProcess = new EventEmitter();

// sinon spies for behaviour verification
let unrefSpy = sinon.spy();
let disconnectSpy = sinon.spy();

// storing stubbed methods arguments for verification
let spawnArgs, processArgs;

describe('Broker daemonized launching', () => {
    before(() => {
        // stub cp.spawn, to avoid actual daemon launch
        sinon.stub(cp, 'spawn').callsFake((...args) => {
            spawnArgs = args;

            mockChildProcess['unref'] = unrefSpy;
            mockChildProcess['disconnect'] = disconnectSpy;
            return mockChildProcess;
        });

        // stub process.exit to avoid exiting
        sinon.stub(process, 'exit').callsFake((...args) => {
            processArgs = args;
        });

        // stub console.log for daemon status output
        sinon.stub(console, 'log');

        launchBroker(5001);
    });

    after(() => {
        cp.spawn.restore();
        process.exit.restore();
        console.log.restore();
    });

    it('should provide correct spawn arguments', () => {
        expect(spawnArgs[0]).to.equal(process.execPath);
        expect(spawnArgs[1]).to.eql(['./dashboard/server/index.js']);
        expect(spawnArgs[2]).to.eql({
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
        });
    });

    it('should launch broker correctly', () => {
        mockChildProcess.emit('message', (cb) => cb());

        expect(unrefSpy.callCount).to.equal(1);
        expect(unrefSpy.calledWith()).to.be.true;

        expect(disconnectSpy.callCount).to.equal(1);
        expect(unrefSpy.calledWith()).to.be.true;

        expect(processArgs[0]).to.equal(0);
    });

    it('should not accept invalid port numbers', () => {
        expect(() => launchBroker(99999)).to.throw('Invalid port number.');
        expect(() => launchBroker(0)).to.throw('Invalid port number.');
    });
});
