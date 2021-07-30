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
        <div className="active-run w-full font-mono shadow rounded p-2 m-2">
            <div className="active-run__details flex flex-1 justify-between mt-4">
                <Link href={`/run/${run.id}`}  passHref>
                    <p className="text-lg cursor-pointer">{run.command}</p>
                </Link>
                <div className="active-run__cta flex h-2/4 items-center justify-evenly">
                    <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded mr-4"
                        onClick={handlePauseButton}
                    >
                        {run.isPaused() ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                        onClick={handleAbortButton}
                    >
                        Abort
                    </button>
                </div>
            </div>
            <div className="active-run__footer flex justify-between items-center mt-6 border-t pt-1">
                <StatusRibbon run={run} />
                <p className="text-sm ">{parsedTime}</p>
            </div>
        </div>
    );
});

export default ActiveRun;
