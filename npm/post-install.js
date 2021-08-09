const fs = require('fs');
const join = require('path').join;
const cp = require('child_process');
const os = require('os');
const async = require('async');

const packageDirs = ['reporter', 'dashboard', 'frontend'];

function installDeps(modPath, done) {
    // ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json'))) {
        return;
    }

    console.log(`\nInstalling dependencies in ${modPath}\n`);

    // npm binary based on OS
    var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

    // install folder
    cp.spawn(npmCmd, ['i'], {
        env: process.env,
        cwd: modPath,
        stdio: 'inherit',
    }).on('exit', (code) => {
        if (code) {
            done(new Error('Failed to install dependencies'));
        }

        done();
    });
}

async.mapLimit(packageDirs, 1, installDeps, (err) => {
    if (err) {
        throw err;
    }
});
