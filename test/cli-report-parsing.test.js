const expect = require('chai').expect;
let cli;

const version = require('../package.json').version;

describe('CLI port number parsing', () => {
    beforeEach(function () {
        // delete require cache to use program instance for consecutive runs.
        delete require.cache[require.resolve('./cli/mockCLI.js')];
        cli = require('./cli/mockCLI');
    });

    it('should use the default port number of 3000', (done) => {
        cli('node index.js', (err, opts) => {
            expect(err).to.be.null;
            expect(opts).to.eql({
                port: '3000',
            });
            done();
        });
    });

    it('should use the specified port number', (done) => {
        cli('node index.js --port 5000', (err, opts) => {
            expect(err).to.be.null;
            expect(opts).to.eql({
                port: '5000',
            });
            done();
        });
    });
});
