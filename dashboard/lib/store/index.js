const Table = require('./table');

const cache = {};

const api = {
    createTable: async (tableName) => {
        cache[tableName] = new Table({});
        return;
    },

    getTable: async (tableName) => {
        if(!cache.hasOwnProperty(tableName)) this.createTable(tableName);
        return cache[tableName];
    },
};

module.exports = api;
