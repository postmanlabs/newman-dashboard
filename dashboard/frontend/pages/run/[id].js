import { useRouter } from "next/router";
import { observer } from "mobx-react";

import runStore from '../../state/stores';

import RunData from "../../components/RunData";
import Header from "../../components/Header";

const RunDetails = observer((props) => {
    const router = useRouter();
    const { id } = router.query;

    const run = runStore.find(id);

    return (
        <>
            <Header />
            {!!run ? <RunData run={run} /> : <p>Invalid Run</p>}
        </>
    );
});

export default RunDetails;
