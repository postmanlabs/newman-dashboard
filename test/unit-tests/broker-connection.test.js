const expect = require('chai').expect;
const io = require('socket.io-client');
const dashboardServer = require('../../dashboard/server/index');

describe('Broker socket connections', () => {
    let client;

    before((done) => {
        client = io('http://localhost:5001/', {
            auth: {
                id: 'gxwYN8wa0kerK20D',
                type: 'newman-run',
            },
        });
        client.on('connect', done);
    });

    after(() => {
        // close client and server to exit the CLI
        client.close();
        dashboardServer.io.close();
        dashboardServer.server.close();
    });

    it('should emit events', (done) => {
        client.emit('test:connection', (arg) => {
            expect(arg).to.equal('dashboard:ping');
            done();
        });
    });

    it('should emit start of new run to dashboard', (done) => {
        client.emit(
            'control:new-run',
            {
                id: 'gxwYN8wa0kerK20D',
                command: 'test:newman-command',
                startTime: Date.now(),
            },
            (type, arg) => {
                expect(type).to.equal('new-run');
                expect(arg).to.haveOwnProperty('id');
                expect(arg.id).to.have.lengthOf(16);
                done();
            }
        );
    });
});
