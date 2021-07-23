const actionType = {
    active: ["Running", "green-400"],
    pause: ["Paused", "yellow-300"],
    abort: ["Aborted", "red-500"],
    done: ["Done", "gray-500"],
};

const StatusRibbon = (props) => {
    const status = actionType[props.status] || ["", "transparent"];
    return (
        <div className="status-ribbon flex items-center bg-gray-200 px-2 py-1 rounded-full">
            <div
                className={
                    "status-ribbon__dot mr-1 w-3 h-3 rounded-full bg-" +
                    status[1]
                }
            ></div>
            <div className="status-ribbon__status text-sm font-bold">
                {status[0]}
            </div>
        </div>
    );
};

export default StatusRibbon;
