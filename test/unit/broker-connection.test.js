const expect = require('chai').expect;
const io = require('socket.io-client');
const dashboardServer = require('../../dashboard/server/index');

const { nanoid } = require('nanoid');
const id = nanoid(16);

describe('Broker socket connections', () => {
    let client, frontend;

    after(() => {
        dashboardServer.io.close();
        dashboardServer.server.close();
    });

    describe('Run events', () => {
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
            client.close();
        });

        it('should emit events', (done) => {
            client.emit('test', (arg) => {
                expect(arg).to.equal('dashboard:ping');
                done();
            });
        });

        it('should emit start of new run to dashboard', (done) => {
            client.emit(
                'start',
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
            client.emit('pause', { id }, (type, arg) => {
                expect(type).to.equal('pause-run');
                expect(arg).to.haveOwnProperty('id');
                expect(arg.id).to.equal(id);
                done();
            });
        });

        it('should emit aborting of a run to dashboard', (done) => {
            client.emit('abort', { id }, (type, arg) => {
                expect(type).to.equal('abort-run');
                expect(arg).to.haveOwnProperty('id');
                expect(arg.id).to.equal(id);
                done();
            });
        });

        it('should emit resuming of a run to dashboard', (done) => {
            client.emit('resume', { id }, (type, arg) => {
                expect(type).to.equal('resume-run');
                expect(arg).to.haveOwnProperty('id');
                expect(arg.id).to.equal(id);
                done();
            });
        });
    });

    describe('Frontend events', () => {
        before((done) => {
            frontend = io('http://localhost:5001/', {
                auth: {
                    id,
                    type: 'frontend',
                },
            });
            frontend.on('connect', done);
        });

        after(() => {
            frontend.close();
        });

        it('should request to pause a run', (done) => {
            frontend.emit('pause', { id }, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.haveOwnProperty('id');
                expect(data.id).to.equal(id);
                done();
            });
        });

        it('should return an error for invalid data', (done) => {
            frontend.emit('pause', { test: 'abc' }, (err, data) => {
                expect(err).to.be.not.null;
                done();
            });
        });

        it('should request to abort a run', (done) => {
            frontend.emit('abort', { id }, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.haveOwnProperty('id');
                expect(data.id).to.equal(id);
                done();
            });
        });

        it('should request to resume a run', (done) => {
            frontend.emit('resume', { id }, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.haveOwnProperty('id');
                expect(data.id).to.equal(id);
                done();
            });
        });

        it('should request to pause a run', (done) => {
            frontend.emit('resume', { id }, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.haveOwnProperty('id');
                expect(data.id).to.equal(id);
                done();
            });
        });
    });
});
