const Table = require('./table');

const cache = {};

const api = {
    createTable: (tableName) => {
        cache[tableName] = new Table({});
        return;
    },

    getTable: (tableName) => {
        if(!cache.hasOwnProperty(tableName)) api.createTable(tableName);
        return cache[tableName];
    },
};

module.exports = api;
