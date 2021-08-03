import { RUN_STATUS } from '../state/models/run';

const statusMap = {
    [RUN_STATUS.ACTIVE]: {
        userFriendlyStatus: "Running",
        bgColorClassName: "bg-green-400"
    },
    [RUN_STATUS.PAUSED]: {
        userFriendlyStatus: "Paused",
        bgColorClassName: "bg-yellow-300"
    },
    [RUN_STATUS.ABORTED]: {
        userFriendlyStatus: "Aborted",
        bgColorClassName: "bg-red-500"
    },
    [RUN_STATUS.FINISHED]: {
        userFriendlyStatus: "Done",
        bgColorClassName: "bg-gray-500"
    },
    [RUN_STATUS.INTERRUPTED]: {
        userFriendlyStatus: "Error",
        bgColorClassName: "bg-red-900"
    },
};

const StatusRibbon = ({ run }) => {
    const {
        userFriendlyStatus,
        bgColorClassName
    } = statusMap[run.status] || {};

    return (
        <div className="status-ribbon flex items-center bg-gray-200 px-2 py-1 rounded-full">
            <div className={`status-ribbon__dot mr-1 w-3 h-3 rounded-full ${bgColorClassName}`} />
            <div className="status-ribbon__status text-sm font-bold">
                {userFriendlyStatus}
            </div>
        </div>
    );
};

export default StatusRibbon;
