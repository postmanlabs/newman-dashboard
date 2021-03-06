import sdk from "postman-collection";

const BeforeIteration = ({ arg, err }) => {
    return (
        <div className="before-iteration bg-gray-200 font-bold px-2 text-lg rounded-l rounded-r mt-4">
            <p>
                Iteration {arg.cursor.iteration + 1} / {arg.cursor.cycles}
            </p>
        </div>
    );
};

const BeforeItem = ({ arg, err }) => {
    return (
        <div className="ml-4 mt-4">
            <p>{arg.item.name}</p>
        </div>
    );
};

const Assertion = ({ arg, err }) => {
    return (
        <div className="ml-10 flex text-gray-400">
            {!!err ? <p>❌</p> : <p>✔️</p>}
            <p className="ml-2 italic">{arg.assertion}</p>
        </div>
    );
}

const BeforeRequest = ({ arg, err }) => {
    const requestUrl = new sdk.Url(arg.request.url);

    return (
        <div className="ml-8">
            <p className="text-gray-600">
                {arg.request.method} {requestUrl.toString()}
            </p>
        </div>
    );
};

const Request = ({ arg, err }) => {
    let code, responseTime;
    if (arg.hasOwnProperty('response') && arg.response.hasOwnProperty('code')) {
        code = arg.response.code;
        responseTime = arg.response.responseTime;
    } else {
        code = 'ERR';
        responseTime = 0;
    }

    const bgColor = code === 200 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="flex ml-8 my-2 text-sm">
            <p
                className={
                    "mr-2 bg-gray-100 px-2 rounded-l rounded-r " + bgColor
                }
            >
                {code}
            </p>
            <p className="text-gray-400 bg-gray-100 px-2 rounded-l rounded-r">
                {responseTime} ms
            </p>
        </div>
    );
};

const Events = {
    beforeIteration: BeforeIteration,
    beforeItem: BeforeItem,
    beforeRequest: BeforeRequest,
    request: Request,
    assertion: Assertion
};

const RunEvent = ({ event }) => {
    return (
        <div className="event__item w-11/12 font-mono">
            {Events.hasOwnProperty(event.type) && (
                <div className="event__meta flex justify-between">
                    {Events[event.type]({ arg: event.args, err: event.err})}
                </div>
            )}

            <div className="event__args pl-2"></div>
        </div>
    );
};

export default RunEvent;
