const connect = require('camo').connect;
const uri = 'nedb://lib/data';

const init = async () => {
    try {
        await connect(uri);
    } catch (e) {
        console.log('Error in connecting to database.');
    }
};

module.exports = { init };
