import { useRouter } from "next/router";
import { observer } from "mobx-react";

import runStore from '../../state/stores';

import RunData from "../../components/RunData";
import Header from "../../components/Header";
import EmptyRuns from '../../components/EmptyRuns';

const RunDetails = observer((props) => {
    const router = useRouter();
    const { id } = router.query;

    const run = runStore.find(id);

    return (
        <>
            <Header />
            {!!run ? (
                <RunData run={run} />
            ) : (
                <div className="flex flex-col items-center">
                    <EmptyRuns message="No run found." />
                </div>
            )}
        </>
    );
});

export default RunDetails;
