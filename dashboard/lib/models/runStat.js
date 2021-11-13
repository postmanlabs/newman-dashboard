const Document = require('camo').Document;

class RunStat extends Document {
    constructor() {
        super();

        this.cpu = Number;
        this.memory = Number;
        this.runId = String;
    }
}

module.exports = RunStat;
