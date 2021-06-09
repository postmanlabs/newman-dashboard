const expect = require('chai').expect;
const io = require('socket.io-client');

describe('Broker connection handling', () => {
    let client, terminateBroker;

    before((done) => {
        terminateBroker = require('../dashboard/server/index');
        client = io('http://localhost:5001/');
        client.on('connect', done);
    });

    after(() => {
        client.close();
        terminateBroker();
    });

    it('should emit events', (done) => {
        client.emit('test-conn', (arg) => {
            expect(arg).to.equal('hello world');
            done();
        });
    });
});
