const expect = require('chai').expect;
const sinon = require('sinon');

// unit to test
const handlers = require('../../../../../dashboard/server/api/server');

describe('Server API Endpoints', () => {
    describe('getAllRuns', () => {
        let req, res, jsonSpy;

        beforeEach('setup mocks and spies', () => {
            req = sinon.spy();
            jsonSpy = sinon.spy();

            res = {
                status: sinon.spy(() => ({
                    json: jsonSpy,
                })),
            };
        });

        it('should return the response correctly', async () => {
            await handlers.getAllRuns(req, res);

            expect(req.callCount).to.equal(0);

            expect(res.status.callCount).to.equal(1);
            expect(res.status().json.callCount).to.equal(1);

            expect(res.status.firstCall.args).to.have.lengthOf(1);
            expect(res.status.firstCall.args[0]).to.equal(200);

            expect(res.status().json.firstCall.args).to.have.lengthOf(1);
            expect(res.status().json.firstCall.args[0]).to.haveOwnProperty('store');
        });
    });

    describe('getRun', () => {
        let req, res, jsonSpy;

        beforeEach('setup mocks and spies', () => {
            req = {
                params: {
                    id: 1,
                }
            };

            jsonSpy = sinon.spy();

            res = {
                status: sinon.spy(() => ({
                    json: jsonSpy,
                })),
            };
        });

        it('should return the response correctly', async () => {
            await handlers.getRun(req, res);

            expect(res.status.callCount).to.equal(1);
            expect(res.status().json.callCount).to.equal(1);

            expect(res.status.firstCall.args).to.have.lengthOf(1);
            expect(res.status.firstCall.args[0]).to.equal(200);

            expect(res.status().json.firstCall.args).to.have.lengthOf(1);
            expect(res.status().json.firstCall.args[0]).to.haveOwnProperty('run');
        });
    });
});
