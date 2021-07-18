const path = require('path');
const fs = require('fs');
const { getCollection, initDB } = require('lokijs-promise');

const envPaths = require('env-paths');
const dataPath = envPaths('newman-reporter-dashboard').data;
const tempDir = path.join(dataPath, '..');

const fetchCollection = async () => {
    const runs = await getCollection();
    return runs;
};

const init = async () => {
    console.log('called');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
        fs.mkdirSync(dataPath);
    }

    initDB(path.join(dataPath, 'runs.db'), 1000);
    return await fetchCollection();
};

module.exports = { init };
