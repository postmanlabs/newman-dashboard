import { observer } from "mobx-react";
import StatusRibbon from "./StatusRibbon";
import RunEvent from "./RunEvent";

const RunData = observer(({ run }) => {
    const parsedTime = new Date(run.startTime).toLocaleTimeString();

    const handlePauseButton = () => {
        run.isPaused() ? run.resume() : run.pause();
    };

    const handleAbortButton = () => {
        run.abort();
    };

    return (
        <div className="run-data p-6">
            <div className="run-data__meta">
                <p className="font-mono text-xl">{run.command}</p>
                <div className="flex justify-between my-5 mr-6">
                    <div>
                        <StatusRibbon status={run.status} />
                    </div>
                    <div className="flex">
                        <div className="mr-8 text-center">
                            <p className="font-mono text-3xl">
                                {run.getCpuUsage() || 0}%
                            </p>
                            <p className="text-sm italic">
                                {run.isActive() || run.isPaused()
                                    ? "CPU Usage"
                                    : "Average CPU Usage"}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="font-mono text-3xl">
                                {run.getMemoryUsage() || 0}MB
                            </p>
                            <p className="text-sm italic">
                                {run.isActive() || run.isPaused()
                                    ? "Memory Usage"
                                    : "Average Memory Usage"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="active-run__cta flex items-center justify-evenly">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-4"
                            onClick={handlePauseButton}
                            disabled={run.isFinished()}
                        >
                            {run.isPaused() ? "Resume" : "Pause"}
                        </button>
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded"
                            onClick={handleAbortButton}
                            disabled={run.isFinished()}
                        >
                            Abort
                        </button>
                    </div>
                    <p className="italic mr-4">{parsedTime}</p>
                </div>
            </div>
            <div className="run-data__details my-2 mt-6">
                <p className="font-bold text-xl">Run Details</p>
            </div>
            <div className="run-data__events my-2 flex flex-col items-center">
                {!!run.events.length &&
                    run.events.map((event) => (
                        <RunEvent
                            event={event}
                            startTime={run.startTime}
                            key={event.time}
                        />
                    ))}
            </div>
        </div>
    );
});

export default RunData;
