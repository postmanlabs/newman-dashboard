module.exports = {
    validPortNumber: (portNo) => {
        return !isNaN(portNo) && Number(portNo) >= 1 && Number(portNo) <= 65535;
    },
};
