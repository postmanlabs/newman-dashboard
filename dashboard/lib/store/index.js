const Table = require('./table');

const cache = {};

const api = {
    _createTable: (tableName) => {
        cache[tableName] = new Table({});
        return;
    },

    getTable: async (tableName) => {
        if (!cache.hasOwnProperty(tableName)) api._createTable(tableName);
        return cache[tableName];
    },
};

module.exports = api;
