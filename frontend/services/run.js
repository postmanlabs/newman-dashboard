import store from '../state/stores/runStore';

class RunService {
    async fetchData(id) {
        const res = await fetch(`http://localhost:5001/api/run/${id}`);
        const data = await res.json();
        data.run && store.add(data.run);
        return data.run;
    }
};  

module.exports = new RunService();