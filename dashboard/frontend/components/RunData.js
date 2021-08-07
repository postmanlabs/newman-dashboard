import { observer } from 'mobx-react';
import StatusRibbon from './StatusRibbon';
import RunEvent from './RunEvent';

const RunData = observer(({ run }) => {
    const parsedTime = new Date(run.startTime).toLocaleTimeString();
    return (
        <div className="run-data p-6">
            <div className="run-data__meta">
                <p className="font-mono text-xl">{run.command}</p>
                <div className="flex justify-between my-5 mr-6">
                    <div>
                        <StatusRibbon run={run} />
                    </div>
                    <div className="flex">
                        <div className="mr-6 text-center">
                            <p className="font-mono text-3xl">{run.averageCpuUsage() || 0}%</p>
                            <p className="text-sm">CPU</p>
                        </div>
                        <div className="text-center">
                            <p className="font-mono text-3xl">{run.averageMemoryUsage() || 0}MB</p>
                            <p className="text-sm">Memory</p>
                        </div>
                    </div>
                </div>
                <p className="text-left">{parsedTime}</p>
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
