class Event {
    constructor(data) {
        this._init(data);
    }

    _init(data) {
        this.type = data.type;
        this.parentId = data.id;
        this.time = Date.now();
        this.args = data.args;
        this.err = data.err;
    }
}

module.exports = Event;
