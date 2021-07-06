const expect = require('chai').expect;
const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const id = nanoid(16);

// unit under test
const Server = require('../../../../dashboard/server');

describe('Server', () => {
    let launchedServer;

    before(() => {
        launchedServer = Server.init();
    });

    after(() => {
        launchedServer.io.close();
        launchedServer.server.close();
    });

    describe('Run events', () => {
        let runClient;

        before(() => {
            runClient = io('http://localhost:5001/', {
                auth: {
                    id,
                    type: 'newman-run',
                },
            });
        });

        after(() => {
            runClient.close();
        });

        it('should receive run events', (done) => {
            runClient.emit('test', (msg) => {
                expect(msg).to.equal('dashboard:ping');
                done();
            });
        });
    });

    describe('Frontend events', () => {
        let frontendClient;

        before(() => {
            frontendClient = io('http://localhost:5001/', {
                auth: {
                    id,
                    type: 'frontend',
                },
            });
        });

        after(() => {
            frontendClient.close();
        });

        it('should receive frontend events', (done) => {
            frontendClient.emit('test', (msg) => {
                expect(msg).to.equal('dashboard:ping');
                done();
            });
        });
    });
});
