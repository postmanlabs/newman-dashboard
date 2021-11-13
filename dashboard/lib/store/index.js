const connect = require('camo').connect;
const paths = require('env-paths')('newman-dashboard');
const uri = `nedb://${paths.data}`;

const init = async () => {
    try {
        await connect(uri);

        // cleanup function to terminate db connection
        return () => process.exit(0);
    } catch (e) {
        console.log('Error in connecting to database.');
    }
};

module.exports = { init };
