import { Provider } from 'mobx-react';
import { useStore } from '../state/stores';

import '../styles/index.scss';
import { mountSockets } from '../actions';

let socket;

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialState)
    socket = mountSockets(store);

    return (
        <Provider store={store} socket={socket}>
            <Component {...pageProps} />
        </Provider>
    )
};

export { socket };
