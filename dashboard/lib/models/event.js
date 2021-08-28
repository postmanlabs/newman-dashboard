const EmbeddedDocument = require("camo").EmbeddedDocument;

class Event extends EmbeddedDocument {
    constructor() {
        super();

        this.type = String;
        this.parentId = String;
        this.time = Date;
        this.args = [String];
        this.err = String;
    }
}

module.exports = Event;
