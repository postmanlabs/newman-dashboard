class Table {
    cache = {};

    constructor (initialData = {}) {
        this.cache = initialData;
    }

    async insert(id, data) {
        if (!id || !data) return;
        this.cache[id] = data;
    }

    async find() {
        return this.cache;
    }

    async findOne(id) {
        return id && this.cache[id];
    }

    async clear() {
        this.cache = {};
    }

    async remove(id) {
        id && delete this.cache[id];
    }
}

module.exports = Table;