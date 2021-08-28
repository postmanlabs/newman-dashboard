const Run = require("../../lib/models/run");

module.exports = {
    getAllRuns: async (req, res) => {
        const limit = req.query.limit || 10;
        const page = req.query.page || 0;
        const skip = Number(page) * Number(limit);

        const runs = await Run.find(
            {},
            { populate: true, sort: "-endTime", limit, skip }
        );

        return res.status(200).json({
            store: runs,
        });
    },

    getRun: async (req, res) => {
        const id = req.params.id;
        const run = await Run.findOne({ _id: id }, { populate: true });

        return res.status(200).json({
            run,
        });
    },
};
