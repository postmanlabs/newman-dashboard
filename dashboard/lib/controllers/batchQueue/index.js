class BatchQueue {
    constructor(queueProcessor) {
        this.queue = [];
        this.processing = false;
        this.queueProcessor = queueProcessor;
    }

    add(data) {
        this.queue.push(data);
        this.processQueue();
    }

    async processQueue() {
        if (this.queue.length == 0) {
            this.processing = false;
            return;
        }

        if (this.processing) return;

        this.processing = true;
        const currentQueue = this.queue;
        this.queue = [];

        await currentQueue.reduce(async (prevPromise, item) => {
            await prevPromise;
            await this.queueProcessor(item);
        }, Promise.resolve());

        return this.processQueue;
    }
}

module.exports = BatchQueue;
