const fs = require('fs');
const join = require('path').join;
const cp = require('child_process');
const os = require('os');
const async = require('async');
const packageDirs = ['reporter', 'dashboard', 'frontend'];

function buildDocs(modPath, done) {
    // ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json'))) {
        return;
    }

    console.log(`\nBuilding js-docs in ${modPath}\n`);

    // npm binary based on OS
    var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

    cp.spawn(npmCmd, ['run', 'build-docs'], {
        env: process.env,
        cwd: modPath,
        stdio: 'inherit',
    }).on('exit', (code) => {
        if (code) {
            // eslint-disable-next-line prettier/prettier,max-len
            done(new Error(`Error while building. Process exited with code ${code}`));
        }

        done();
    });
}

async.mapLimit(packageDirs, 1, buildDocs, (err) => {
    if (err) {
        throw err;
    }
});
