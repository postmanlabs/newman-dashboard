import {inject ,observer} from 'mobx-react';
import { socket } from '../pages/_app';

const HelloWorld = inject('store')(observer((props) => {
    return (<div className="font-mono text-center text-2xl">
        {`Runs in store: ${props.store.runs.length}`} 
    </div>)
}));

export default HelloWorld;
