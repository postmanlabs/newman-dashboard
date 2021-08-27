const runController = require('../../lib/controllers/run');

module.exports = {
    getAllRuns: async (req, res) => {
        const runs = await runController.find();

        return res.status(200).json({
            store: runs,
        });
    },

    getRun: async (req, res) => {
        const id = req.params.id;
        const run = await runController.findOne(id);

        return res.status(200).json({
            run,
        });
    },
};
