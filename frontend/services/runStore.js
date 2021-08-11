import store from '../state/stores/runStore';

class RunStoreService {
    async fetchRunData() {
        const res = await fetch(`http://localhost:5001/api/run`);
        const data = await res.json();
        store.hydrate(data.store);
    }
};  

module.exports = new RunStoreService();