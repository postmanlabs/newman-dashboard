import Header from "../components/Header";
import RunList from "../components/RunList";
import { useEffect, useState } from "react";
import RunService from "../services/run";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const execService = async () => {
            await RunService.fetch();
            setIsLoading(false);
        }
        execService();
    }, []);

    return (
        <>
            <Header />
            {!isLoading && <RunList />}
        </>
    );
};

export default Home;
