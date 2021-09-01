const Document = require('camo').Document;
const Event = require('./event');

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
        this.events = [Event];
        this.cpuUsage = [Number];
        this.memoryUsage = [Number];
        this.status = String;
    }

    static collectionName() {
        return 'runs';
    }
}

module.exports = Run;
