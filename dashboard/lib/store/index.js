const connect = require('camo').connect;
const uri = 'nedb://../data/index.db';

const init = async () => {
  try {
    await connect(uri);
  } catch (e) {
    console.log('Error in connecting to database.')
  }
}

module.exports = { init };