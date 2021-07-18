const path = require('path');
const fs = require('fs');
const { getCollection, initDB, getDB } = require('lokijs-promise');

const envPaths = require('env-paths');
const dataPath = envPaths('newman-reporter-dashboard').data;
const tempDir = path.join(dataPath, '..');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
    fs.mkdirSync(dataPath);
}

const fetchCollection = async () => {
    const runs = await getCollection();
    return runs;
};

const init = async () => {
    initDB(path.join(dataPath, 'runs.db'), 1000);
    return await fetchCollection();
};

module.exports = { init };
