const { expect } = require('chai');
const launchBroker = require('../../dashboard/index');

describe('Launching broker', () => {
    let launchParams;

    before(() => {
        launchParams = launchBroker(3001, true);
    });

    it('should send the right spawn arguments', () => {
        expect(launchParams.args.execPath).to.eql(process.execPath);
        expect(launchParams.args.pathName).to.eql([
            './dashboard/server/index.js',
        ]);
    });

    it('should send the right spawn options', () => {
        expect(launchParams.args.options.detached).to.be.true;
        expect(launchParams.args.options.stdio).to.eql([
            'ignore',
            'ignore',
            'ignore',
            'ipc',
        ]);
    });
});
