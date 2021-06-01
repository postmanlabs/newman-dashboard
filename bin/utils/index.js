module.exports = {
    validatePortNumber: (portNo) => {
        return !isNaN(portNo) && portNo >= 1 && portNo <= 65535;
    },
};
