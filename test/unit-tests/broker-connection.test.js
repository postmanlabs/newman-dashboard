const expect = require('chai').expect;
const io = require('socket.io-client');
const dashboardServer = require('../../dashboard/server/index');

describe('Broker socket connections', () => {
    let client;

    before((done) => {
        client = io('http://localhost:5001/');
        client.on('connect', done);
    });

    after(() => {
        // close client and server to exit the CLI
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
