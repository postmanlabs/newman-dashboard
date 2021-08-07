import { observer } from "mobx-react";
import ActiveRun from "./ActiveRun";
import EmptyRuns from "./EmptyRuns";

import runStore from "../state/stores";

const RunList = observer(() => {
    const runs = runStore.getSortedRuns();
    return (
        <div className="active-runs-list flex flex-col items-center">
            {!!runs.length ? (
                runs.map((run) => <ActiveRun run={run} key={run.id} />)
            ) : (
                <EmptyRuns />
            )}
        </div>
    );
});

export default RunList;
