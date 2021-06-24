const expect = require('chai').expect;
const io = require('socket.io-client');
const dashboardServer = require('../../dashboard/server/index');

const { nanoid } = require('nanoid');
const id = nanoid(16);

describe('Broker socket connections', () => {
    let client;

    before((done) => {
        client = io('http://localhost:5001/', {
            auth: {
                id,
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
                id,
                command: 'test:newman-command',
                startTime: Date.now(),
            },
            (type, arg) => {
                expect(type).to.equal('new-run');
                expect(arg).to.haveOwnProperty('id');
                expect(arg.id).to.equal(id);
                done();
            }
        );
    });

    it('should emit pausing of a run to dashboard', (done) => {
        client.emit('control:pause-run', { id }, (type, arg) => {
            expect(type).to.equal('pause-run');
            expect(arg).to.haveOwnProperty('id');
            expect(arg.id).to.equal(id);
            done();
        });
    });

    it('should emit aborting of a run to dashboard', (done) => {
        client.emit('control:abort-run', { id }, (type, arg) => {
            expect(type).to.equal('abort-run');
            expect(arg).to.haveOwnProperty('id');
            expect(arg.id).to.equal(id);
            done();
        });
    });

    it('should emit resuming of a run to dashboard', (done) => {
        client.emit('control:resume-run', { id }, (type, arg) => {
            expect(type).to.equal('resume-run');
            expect(arg).to.haveOwnProperty('id');
            expect(arg.id).to.equal(id);
            done();
        });
    });
});
