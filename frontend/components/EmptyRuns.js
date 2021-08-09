const EmptyRuns = ({ message }) => {
    return (
        <div className="mt-44 text-center">
            {message && <p className="text-center text-xl text-gray-500 italic">{message}</p>}
            <div className="mt-4 shadow px-5 py-5 rounded">
                <p className="text-bold text-gray-500 italic text-lg" >Install newman dashboard</p>
                <p className="font-mono bg-gray-100 text-gray-500 rounded-l rounded-r my-4 text-xl text-center">npm i -g newman-reporter-dashboard</p>
                <p className="mt-8 text-gray-500 italic text-lg">Connect a run to the dashboard</p>
                <p className="font-mono bg-gray-100 text-gray-500 rounded-l rounded-r my-4 px-4 text-xl text-center">newman run collection.json -r dashboard,cli</p>
            </div>
        </div>
    )
}

export default EmptyRuns;