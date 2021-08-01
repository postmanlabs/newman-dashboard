import runStore from '../state/stores';

import '../styles/index.scss';
import { mountSockets } from '../actions';

let socket;

export default function App({ Component, pageProps }) {
    socket = mountSockets(runStore);

    return (
        <Component {...pageProps} />
    )
};

export { socket };
