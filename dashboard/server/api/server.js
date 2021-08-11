const controllers = require('../../lib/controllers/run');

module.exports = {
    getAllRuns: (req, res) => {
        const runs = await controllers.find();

        return res.status(200).json({
            store: runs,
        });
    },

    getRun: (req, run) => {
        const id = req.params.id;
        const run = await controllers.findOne(id);

        return res.status(200).json({
            run
        });
    }
};
