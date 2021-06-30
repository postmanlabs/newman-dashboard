const expect = require('chai').expect;
const cli = require('../utils/mocks/CLI');

describe('CLI', () => {
    it('should use the default port number of 3000', (done) => {
        cli('node index.js', (err, opts) => {
            expect(err).to.be.null;
            expect(opts).to.include({ port: '3000' });
            done();
        });
    });

    it('should use the specified port number', (done) => {
        cli('node index.js --port 5000', (err, opts) => {
            expect(err).to.be.null;
            expect(opts).to.include({ port: '5000' });
            done();
        });
    });

    it('should start the server');

    it('should handle invalid arguments');

    describe('with option --daemonize', () => {
        it('should launch the server as a daemon');
    });

    describe('with option --version', () => {
        it('should show the version');
        it('should not start the server');
    });
});
