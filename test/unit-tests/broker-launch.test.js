const sinon = require('sinon');
const cp = require('child_process');
const { EventEmitter } = require('events');
const expect = require('chai').expect;

const launchBroker = require('../../dashboard/index');

const mockChildProcess = new EventEmitter();

let fake = sinon.fake();

describe('Broker daemonized launching', () => {
    before(() => {
        sinon.stub(cp, 'spawn').callsFake(() => {
            mockChildProcess.unref = fake;
            mockChildProcess.disconnect = fake;
            return mockChildProcess;
        });

        sinon.stub(process, 'exit');
        sinon.stub(console, 'log');

        launchBroker(3000);
    });

    after(() => {
        cp.spawn.restore();
        process.exit.restore();
        console.log.restore();
    });

    it('should launch broker correctly', () => {
        mockChildProcess.emit('message', (cb) => cb());
        expect(fake.callCount).to.equal(2);
    });
});
