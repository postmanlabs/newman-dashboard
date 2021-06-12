module.exports = {
    mockSpawn: (execPath, pathName, options) => {
        const onEventListener = (eventName, cb) => {
            const emitData = { message: '' };
            cb(emitData);
        };

        // a ChildProcess mock along with spawn arguments for unit tests
        const childProcessMock = {
            on: onEventListener,
            unref: () => {},
            disconnect: () => {},
            args: {
                execPath,
                pathName,
                options,
            },
        };

        return childProcessMock;
    },
};
