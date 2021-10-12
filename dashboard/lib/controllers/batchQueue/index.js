class BatchQueue {
    constructor (queueProcessor) {
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

        await currentQueue.reduce(async (prevPromise, item, index) => {
            await prevPromise;
            await this.queueProcessor(item);

            // at last item, mark processing as complete so that the new batch can be saved
            if (index == currentQueue.length - 1) { 
                this.processing = false
                this.processQueue();
            };
        }, Promise.resolve());
    }
}

module.exports = BatchQueue;
