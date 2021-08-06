import sdk from "postman-collection";

const BeforeIteration = ({ arg }) => {
    return (
        <div className="before-iteration bg-gray-200 font-bold px-2 text-lg rounded-l rounded-r mt-4">
            <p>
                Iteration {arg.cursor.iteration + 1} / {arg.cursor.cycles}
            </p>
        </div>
    );
};

const BeforeItem = ({ arg }) => {
    return (
        <div className="ml-4 mt-4">
            <p>{arg.item.name}</p>
        </div>
    );
};

const BeforeRequest = ({ arg }) => {
    const requestUrl = new sdk.Url(arg.request.url);

    return (
        <div className="ml-8">
            <p className="text-gray-600">
                {arg.request.method} {requestUrl.toString()}
            </p>
        </div>
    );
};

const Request = ({ arg }) => {
    const bgColor = arg.response.code === 200 ? 'text-green-500' : 'text-yellow-200';

    return (
        <div className="flex ml-8 mt-2 text-sm">
            <p
                className={
                    "mr-2 bg-gray-100 px-2 rounded-l rounded-r " + bgColor
                }
            >
                {arg.response.code}
            </p>
            <p className="text-gray-400 bg-gray-100 px-2 rounded-l rounded-r">
                {arg.response.responseTime} ms
            </p>
        </div>
    );
};

const Events = {
    beforeIteration: BeforeIteration,
    beforeItem: BeforeItem,
    beforeRequest: BeforeRequest,
    request: Request,
};

const RunEvent = ({ event }) => {
    return (
        <div className="event__item w-11/12 font-mono">
            {Events.hasOwnProperty(event.type) && (
                <div className="event__meta flex justify-between">
                    {Events[event.type]({ arg: event.args })}
                </div>
            )}

            <div className="event__args pl-2"></div>
        </div>
    );
};

export default RunEvent;
