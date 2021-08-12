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

    asyncWrapper: (f) => {
        return async function () {
            try {
                return await f.apply(this, arguments);
            } catch (e) {
                e.message && console.log(e.message);
            }
        };
    },
};
