const EventArgs = ({arg}) => {
    return (
        <div className="event__arg">
            <p>Cursor Position: {arg.cursor.position} - Cursor Length: {arg.cursor.length}</p>
        </div>
    )
}

const RunEvent = ({event, startTime}) => {
    console
    return (
        <div className="event__item w-11/12 mt-2">
            <div className="event__meta flex justify-between">
                <p className="font-bold font-mono">{event.type}</p>
                <p className="">+{Number(event.time) - Number(startTime)}ms</p>
            </div>
            <div className="event__args pl-2">
                <EventArgs arg={event.args} key={event.args.cursor.ref}/>
            </div>
        </div>
    )
}

export default RunEvent;