const sinon = require('sinon');
const expect = require('chai').expect;
const mock = require('mock-require');

const path = require('path');

const sandbox = sinon.createSandbox();

const envPaths = require('env-paths');
const dataPath = envPaths('newman-reporter-dashboard').data;

const initDbSpy = sandbox.spy();
const getCollectionSpy = sandbox.spy();

// load the store as a fresh module
delete require.cache[require.resolve('../../../../dashboard/store')];

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

        expect(initDbSpy.callCount).to.equal(1);
        expect(initDbSpy.firstCall.args.length).to.equal(2);
        expect(initDbSpy.firstCall.args[0]).to.equal(
            path.join(dataPath, 'runs.db')
        );
        expect(initDbSpy.firstCall.args[1]).to.equal(1000);

        expect(getCollectionSpy.callCount).to.equal(1);
        expect(getCollectionSpy.firstCall.args.length).to.equal(0);
    });
});
