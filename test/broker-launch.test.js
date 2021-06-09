const expect = require('chai').expect;
const io = require('socket.io-client');

describe('Broker connection handling', () => {
    let client, dashboardServer;

    before((done) => {
        dashboardServer = require('../dashboard/server/index');
        client = io('http://localhost:5001/');
        client.on('connect', done);
    });

    after(() => {
        client.close();
        dashboardServer.io.close();
        dashboardServer.server.close();
    });

    it('should emit events', (done) => {
        client.emit('test-conn', (arg) => {
            expect(arg).to.equal('hello world');
            done();
        });
    });
});
