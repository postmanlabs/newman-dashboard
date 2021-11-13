const Document = require('camo').Document;

class Event extends Document {
    constructor() {
        super();

        this.type = String;
        this.parentId = String;
        this.time = Number;
        this.args = [String];
        this.err = String;
        this.runId = String;
    }
}

module.exports = Event;
