const expect = require('chai').expect;

// unit under test
const utils = require('../../../../../reporter/lib/utils');

describe('Reporter Utils', () => {
    describe('generateStartData', () => {
        let generateStartData, mockArgv;

        beforeEach(() => {
            generateStartData = utils.generateStartData;
            mockArgv = 'newman run examples/collection.json';
        });

        afterEach(() => {
            generateStartData = null;
        });

        it('should generate start data correctly', () => {
            const startData = generateStartData(mockArgv.split(' '), 'abc');

            expect(startData).to.haveOwnProperty('id');
            expect(startData).to.haveOwnProperty('command');
            expect(startData).to.haveOwnProperty('startTime');

            expect(startData.id).to.equal('abc');
            expect(startData.command).to.equal('run examples/collection.json');
        });

        it('should error out if no argv provided', () => {
            const startData = generateStartData(undefined, 'abc');
            expect(startData).to.eql({});
        });

        it('should error out if no id provided', () => {
            const startData = generateStartData(mockArgv.split(' '), undefined);
            expect(startData).to.eql({});
        });
    });
});
