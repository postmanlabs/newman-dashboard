import { observer } from 'mobx-react';
import StatusRibbon from './StatusRibbon';

const RunData = observer(({ run }) => {
    const parsedTime = new Date(run.startTime).toLocaleTimeString();
    return (
        <div className="run-data p-4">
            <div className="run-data__meta">
                <p className="font-mono text-xl">{run.command}</p>
                <div className="flex justify-between my-5">
                    <StatusRibbon run={run} />
                    <p className="text-right">{parsedTime}</p>
                </div>
            </div>
            <div className="run-data__details mx-4 my-2">
                <p className="font-bold text-xl">Run Details</p>
            </div>
        </div>
    );
});

export default RunData;
