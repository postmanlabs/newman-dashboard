const expect = require('chai').expect;
const cli = require('./cli/mockCLI');

describe('CLI port number parsing', () => {
    it('should use the default port number of 3000', (done) => {
        cli('node index.js', (err, opts) => {
            expect(err).to.be.null;
            expect(opts).to.eql({
                port: '3000',
                test: true,
            });
            done();
        });
    });

    it('should use the specified port number', (done) => {
        cli('node index.js --port 5000', (err, opts) => {
            expect(err).to.be.null;
            expect(opts).to.eql({
                port: '5000',
                test: true,
            });
            done();
        });
    });
});
