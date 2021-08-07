import StatusRibbon from "./StatusRibbon";
import { observer } from 'mobx-react';
import Link from 'next/link';

const ActiveRun = observer(({ run }) => {
    const parsedTime = new Date(run.startTime).toLocaleTimeString();

    const handlePauseButton = () => {
        run.isPaused() ? run.resume() : run.pause();
    };

    const handleAbortButton = () => {
        run.abort();
    };

    return (
        <div className="active-run font-mono shadow rounded p-2 m-2 mt-4 w-11/12 bg-white">
            <div className="active-run__details flex flex-1 justify-between mt-2">
                <Link href={`/run/${run.id}`}  passHref>
                    <p className="text-lg cursor-pointer mr-2">{run.command}</p>
                </Link>
                <div className="active-run__cta flex items-center justify-evenly">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-4"
                        onClick={handlePauseButton}
                        disabled={run.isFinished()}
                    >
                        {run.isPaused() ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded"
                        onClick={handleAbortButton}
                        disabled={run.isFinished()}
                    >
                        Abort
                    </button>
                </div>
            </div>
            <div className="active-run__footer flex justify-between items-center mt-4 border-t pt-1">
                <StatusRibbon status={run.status} />
                <p className="text-sm ">{parsedTime}</p>
            </div>
        </div>
    );
});

export default ActiveRun;
