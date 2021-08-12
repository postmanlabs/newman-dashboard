const expect = require('chai').expect;

// unit under test
const Table = require('../../../../lib/store/table');

describe('Table class', () => {
    let table, mockData;

    before('setup table mock', () => {
        table = new Table({});
        mockData = {
            id: 'abc',
            arg: 'arg'
        };
    });

    it('should initialize the cache correctly', async () => {
        const cache = await table.find();
        expect(cache).to.deep.equal({});
    });

    it('should insert new item to cache', async () => {
        const item = await table.insert(mockData.id, mockData);
        expect(item).to.be.undefined;
    });

    it('should fetch item from cache', async () => {
        const item = await table.findOne(mockData.id);
        expect(item).to.deep.equal(mockData);
    });

    it('should remove item from cache', async () => {
        const removeItem = await table.remove(mockData.id);
        const item = await table.findOne(mockData.id);

        expect(removeItem).to.be.undefined;
        expect(item).to.be.undefined;
    });

    it('should remove clear the cache', async () => {
        const clear = await table.clear();
        const cache = await table.find();

        expect(clear).to.be.undefined;
        expect(cache).to.deep.equal({});
    });

});