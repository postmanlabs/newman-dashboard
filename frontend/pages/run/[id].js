import { useRouter } from "next/router";
import { observer } from "mobx-react";

import RunService from "../../services/run";

import runStore from "../../state/stores";

import RunData from "../../components/RunData";
import Header from "../../components/Header";
import EmptyRuns from "../../components/EmptyRuns";
import { useEffect, useState } from "react";

const RunDetails = observer(() => {
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    let run = runStore.find(id);

    useEffect(() => {
        const execService = async () => {
            if (!run || !run.events.length) {
                run = await RunService.fetchOne(id);
            }
            setIsLoading(false);
        };
        execService();
    });

    return (
        <>
            <Header />
            {!isLoading &&
                (!!run ? (
                    <RunData run={run} />
                ) : (
                    <div className="flex flex-col items-center">
                        <EmptyRuns message="No run found." />
                    </div>
                ))}
        </>
    );
});

export default RunDetails;
