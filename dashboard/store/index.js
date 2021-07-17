const path = require('path');
const { getCollection, initDB, getDB } = require('lokijs-promise');

const envPaths = require('env-paths');
const dataPath = envPaths('newman-reporter-dashboard').data;

initDB(path.join(dataPath, 'runs.db'), 1000);

const init = async () => {
    const runs = await getCollection();
    return runs;
};

module.exports = { init };
