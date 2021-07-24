const sinon = require('sinon');
const cp = require('child_process');
const { EventEmitter } = require('events');
const expect = require('chai').expect;

const dashboard = require('../../../dashboard');

// mock event emitter to simulate ChildProcess object
const mockChildProcess = new EventEmitter();

// sinon spies for behaviour verification
let unrefSpy = sinon.spy();
let disconnectSpy = sinon.spy();

describe('Broker daemon', () => {
    before(() => {
        // stub cp.spawn, to avoid actual daemon launch
        sinon.stub(cp, 'spawn').callsFake(() => {
            mockChildProcess['unref'] = unrefSpy;
            mockChildProcess['disconnect'] = disconnectSpy;

            return mockChildProcess;
        });

        // stub process.exit to avoid exiting
        sinon.stub(process, 'exit');

        // stub console.log for daemon status output
        sinon.stub(console, 'log');

        dashboard(5001);
    });

    after(() => {
        cp.spawn.restore();
        process.exit.restore();
        // eslint-disable-next-line no-console
        console.log.restore();
    });

    it('should provide correct spawn arguments', () => {
        expect(cp.spawn.args[0][0]).to.equal(process.execPath);
        expect(cp.spawn.args[0][1]).to.eql(['./dashboard/server/index.js']);
        expect(cp.spawn.args[0][2]).to.eql({
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
        });
    });

    it('should launch broker correctly', () => {
        mockChildProcess.emit('message', (cb) => cb());

        expect(unrefSpy.callCount).to.equal(1);
        expect(unrefSpy.firstCall.args).to.have.lengthOf(0);

        expect(disconnectSpy.callCount).to.equal(1);
        expect(disconnectSpy.firstCall.args).to.have.lengthOf(0);

        expect(process.exit.args).to.have.lengthOf(1);
        expect(process.exit.args[0][0]).to.equal(0);
    });

    it('should not accept invalid port numbers', () => {
        expect(() => dashboard(99999)).to.throw('Invalid port number.');
        expect(() => dashboard(0)).to.throw('Invalid port number.');
    });
});
