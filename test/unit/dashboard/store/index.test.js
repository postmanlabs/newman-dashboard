const sinon = require('sinon');
const expect = require('chai').expect;
const mock = require('mock-require');

const sandbox = sinon.createSandbox();

const initDbSpy = sandbox.spy();
const getCollectionSpy = sandbox.spy();

mock('lokijs-promise', {
    initDB: initDbSpy,
    getCollection: getCollectionSpy,
});

// unit under test
const DB = require('../../../../dashboard/store');

describe('DB', () => {
    afterEach(() => {
        sandbox.restore();
        mock.stopAll();
    });

    it('should connect to the database correctly', async () => {
        await DB.init();
        console.log(initDbSpy.firstCall.args);
        console.log(getCollectionSpy.firstCall.args);
    });
});
