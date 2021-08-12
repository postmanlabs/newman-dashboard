const runController = require('../../lib/controllers/run');
const { asyncWrapper } = require('../../lib/utils');

module.exports = {
    getAllRuns: asyncWrapper(async (req, res) => {
        const runs = await runController.find();

        return res.status(200).json({
            store: runs,
        });
    }),

    getRun: asyncWrapper(async (req, res) => {
        const id = req.params.id;
        const run = await runController.findOne(id);

        return res.status(200).json({
            run,
        });
    }),
};
