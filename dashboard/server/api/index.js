module.exports = {
    testSocketConnection: (client) => {
        client.on('test-conn', (cb) => {
            cb('hello world');
        });
    },
};
