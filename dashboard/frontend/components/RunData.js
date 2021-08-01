import { observer } from 'mobx-react';
import StatusRibbon from './StatusRibbon';
import RunEvent from './RunEvent';

const RunData = observer(({ run }) => {
    const parsedTime = new Date(run.startTime).toLocaleTimeString();
    return (
        <div className="run-data p-6">
            <div className="run-data__meta">
                <p className="font-mono text-xl">{run.command}</p>
                <div className="flex justify-between my-5">
                    <StatusRibbon run={run} />
                    <p className="text-right">{parsedTime}</p>
                </div>
            </div>
            <div className="run-data__details my-2">
                <p className="font-bold text-xl">Run Details</p>
            </div>
            <div className="run-data__events my-2 flex flex-col items-center">
                {!!run.events.length && run.events.map((event) => <RunEvent event={event} startTime={run.startTime} key={event.time}/>)}
            </div>
        </div>
    );
});

export default RunData;
