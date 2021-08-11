const store = require('../../store');

module.exports = {
    handleInitData: (req, res) => {
        return res.status(200).json({
            store: store.get(),
        });
    },
};
