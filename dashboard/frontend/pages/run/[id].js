import { useRouter } from 'next/router';
import { inject, observer } from "mobx-react";
import RunData from '../../components/RunData';

const RunDetails = inject("store")(
    observer((props) => {
        const router = useRouter();
        const { id } = router.query;

        const run = props.store.runs.filter((runData) => runData.id === id);

        return (
            !!run.length > 0 ? <RunData run={run[0]} /> : <p>Invalid Run</p>
        );
    })
);

export default RunDetails;
