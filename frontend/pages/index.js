import Header from "../components/Header";
import RunList from "../components/RunList";
import { useEffect, useState } from "react";
import RunStoreService from "../services/runStore";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const execService = async () => {
            await RunStoreService.fetchRunData();
            setIsLoading(false);
        }
        execService();
    });

    return (
        <>
            <Header />
            {!isLoading && <RunList />}
        </>
    );
};

export default Home;
