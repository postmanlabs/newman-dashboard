const expect = require('chai').expect;
const sinon = require('sinon');
const Run = require('../../../../lib/models/run');

// unit to test
const handlers = require('../../../../../dashboard/server/api/server');

describe('Server API Endpoints', () => {
    describe('getAllRuns', () => {
        let req, res, jsonSpy;

        beforeEach('setup mocks and spies', () => {
            req = {
                query: {
                    limit: 1,
                },
            };
            Run.find = sinon.spy();
            jsonSpy = sinon.spy();

            res = {
                status: sinon.spy(() => ({
                    json: jsonSpy,
                })),
            };
        });

        it('should return the response correctly', async () => {
            await handlers.getAllRuns(req, res);

            expect(Run.find.callCount).to.equal(1);
            expect(Run.find.firstCall.args).to.have.lengthOf(2);

            expect(Run.find.firstCall.args[0]).to.deep.equal({});

            expect(Run.find.firstCall.args[1]).to.haveOwnProperty('populate');
            expect(Run.find.firstCall.args[1]).to.haveOwnProperty('sort');
            expect(Run.find.firstCall.args[1]).to.haveOwnProperty('limit');
            expect(Run.find.firstCall.args[1]).to.haveOwnProperty('skip');

            expect(Run.find.firstCall.args[1].populate).to.be.true;
            expect(Run.find.firstCall.args[1].sort).to.equal('-endTime');
            expect(Run.find.firstCall.args[1].limit).to.equal(1);
            expect(Run.find.firstCall.args[1].skip).to.equal(0);

            expect(res.status.callCount).to.equal(1);
            expect(res.status().json.callCount).to.equal(1);

            expect(res.status.firstCall.args).to.have.lengthOf(1);
            expect(res.status.firstCall.args[0]).to.equal(200);

            expect(res.status().json.firstCall.args).to.have.lengthOf(1);
            expect(res.status().json.firstCall.args[0]).to.haveOwnProperty(
                'store'
            );
        });
    });

    describe('getRun', () => {
        let req, res, jsonSpy;

        beforeEach('setup mocks and spies', () => {
            req = {
                params: {
                    id: 1,
                },
            };

            Run.findOne = sinon.spy();

            jsonSpy = sinon.spy();

            res = {
                status: sinon.spy(() => ({
                    json: jsonSpy,
                })),
            };
        });

        it('should return the response correctly', async () => {
            await handlers.getRun(req, res);

            expect(Run.findOne.callCount).to.equal(1);
            expect(Run.findOne.firstCall.args).to.have.lengthOf(2);

            expect(Run.findOne.firstCall.args[0]).to.deep.equal({ _id: 1 });

            expect(Run.findOne.firstCall.args[1]).to.haveOwnProperty(
                'populate'
            );

            expect(Run.findOne.firstCall.args[1].populate).to.be.true;

            expect(res.status.callCount).to.equal(1);
            expect(res.status().json.callCount).to.equal(1);

            expect(res.status.firstCall.args).to.have.lengthOf(1);
            expect(res.status.firstCall.args[0]).to.equal(404);

            expect(res.status().json.firstCall.args).to.have.lengthOf(1);
            expect(res.status().json.firstCall.args[0]).to.haveOwnProperty(
                'run'
            );
        });
    });
});
