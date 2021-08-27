import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';

import RunStore from './runStore';

const isServer = typeof window === 'undefined';

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(isServer);

let store = null;

function initializeStore(initialData = []) {
    const _store = store ?? new RunStore(initialData);

    // If your page has Next.js data fetching methods that use a Mobx store, it will
    // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
    // if (initialData) {
    //     _store.hydrate(initialData)
    // }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

export default RunStore;