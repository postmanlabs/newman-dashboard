import { inject, observer } from "mobx-react";
import ActiveRun from "./ActiveRun";
import EmptyRuns from "./EmptyRuns";

const RunList = inject("store")(
    observer((props) => {
        return (
            <div className="active-runs-list flex flex-col items-center">
                {!!props.store.runs.length ? (
                    props.store.runs
                        .slice(0)
                        .reverse()
                        .map((run) => <ActiveRun run={run} key={run.id} />)
                ) : (
                    <EmptyRuns />
                )}
            </div>
        );
    })
);

export default RunList;
