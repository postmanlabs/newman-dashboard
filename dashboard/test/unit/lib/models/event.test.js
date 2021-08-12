const expect = require('chai').expect;

// unit under test
const Event = require('../../../../lib/models/event');

describe('Event class', () => {
    const mockEventData = {
        type: 'abc',
        id: 'id',
        args: 'sample-args',
        err: 'sample-error',
    };
    let event;

    before(() => {
        event = new Event(mockEventData);
    });

    it('should create the instance correctly', () => {
        expect(event.type).to.equal('abc');
        expect(event.parentId).to.equal('id');
        expect(event.args).to.equal('sample-args');
        expect(event.err).to.equal('sample-error');
        expect(event).to.haveOwnProperty('time');
    });
});
