const expect = require('chai').expect;
const io = require('socket.io-client');
const { nanoid } = require('nanoid');

const id = nanoid(16);

// unit under test
const Server = require('../../../dashboard/server');

describe('Launch broker', () => {
    let launchedServer;

    before(() => {
        launchedServer = Server();
    });

    after(() => {
        launchedServer.io.close();
        launchedServer.server.close();
    });

    describe('Run event emits', () => {
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

        it('should start the server on port 5001', (done) => {
            runClient.emit('test', (msg) => {
                expect(msg).to.equal('dashboard:ping');
                done();
            });
        });
    });

    describe('Frontend event emits', () => {
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

        it('should start the server on port 5001', (done) => {
            frontendClient.emit('test', (msg) => {
                expect(msg).to.equal('dashboard:ping');
                done();
            });
        });
    });
});
