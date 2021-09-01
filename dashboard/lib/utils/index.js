module.exports = {
    validPortNumber: (portNo) => {
        return !isNaN(portNo) && Number(portNo) >= 1 && Number(portNo) <= 65535;
    },

    socketAuth: (socket, next) => {
        const { id, type } = socket.handshake.auth;

        if (id.length === 16 && type) {
            socket.meta = { id, type };
            return next();
        }

        next(new Error('Unauthorized access.'));
    },

    handleDBError: (err) => {
        console.log('Error loading data files. Indicates corrupted data.');
    },
};
