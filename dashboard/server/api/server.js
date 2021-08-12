const controllers = require('../../lib/controllers/run');
const { asyncWrapper } = require('../../lib/utils');

module.exports = {
    getAllRuns: asyncWrapper(async (req, res) => {
        const runs = await controllers.find();

        return res.status(200).json({
            store: runs,
        });
    }),

    getRun: asyncWrapper(async (req, res) => {
        const id = req.params.id;
        const run = await controllers.findOne(id);

        return res.status(200).json({
            run,
        });
    }),
};
