import StatusRibbon from "./StatusRibbon";
import { observer } from 'mobx-react';

const ActiveRun = observer(({ run }) => {
    const parsedTime = new Date(run.startTime).toLocaleTimeString();

    const handlePauseButton = () => {
        if (run.status === "active") {
            run.emitPause();
        } else {
            run.emitResume();
        }
    };

    const handleAbortButton = () => {
        run.emitAbort();
    };

    return (
        <div className="active-run container w-full font-mono shadow rounded p-2 m-2">
            <p className="text-xl">{run.command}</p>
            <div className="active-run__details flex flex-1 justify-between mt-4">
                <StatusRibbon status={run.status} />
                <div className="active-run__cta flex w-2/4 justify-evenly">
                    <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                        onClick={handlePauseButton}
                    >
                        {run.status === 'pause' ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                        onClick={handleAbortButton}
                    >
                        Abort
                    </button>
                </div>
            </div>
            <div className="active-run__timestamp">
                <p className="text-sm mt-4 border-t pt-1">{parsedTime}</p>
            </div>
        </div>
    );
});

export default ActiveRun;
