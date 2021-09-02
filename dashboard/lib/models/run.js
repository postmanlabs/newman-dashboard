const Document = require("camo").Document;
const Event = require("./event");
const RunStat = require("./runStat");

class Run extends Document {
    constructor() {
        super();

        this.command = String;
        this._id = String;
        this.startTime = Date;
        this.endTime = {
            type: Date,
            default: 0,
        };
        this.status = String;
    }

    async populate() {
        this.stats = await RunStat.find({ runId: this._id });
        this.events = await Event.find({ runId: this._id });
    }

    static collectionName() {
        return "runs";
    }
}

module.exports = Run;
