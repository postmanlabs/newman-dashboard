const socket = io(undefined, {
    auth: {
        id: 'gxwYN8wa0kerK20F',
        type: 'frontend',
    },
});

const execRuns = document.getElementById('exec-runs');

socket.on('connect', () => {
    console.log('connected to broker.');
});

// on clicking the pause button
const clickPauseButton = (value) => {
    // get process id of the process on which pause button has been clicked
    const id = value.parentElement.getAttribute('data-process-id');
    const status = value.parentElement.getAttribute('data-process-status');

    // if the run has not ended
    if (status === 'active') {
        const currVal = document.getElementById(`pause-${id}`).innerText;

        if (currVal === 'Pause') {
            socket.emit('pause', {
                id,
            });
        } else {
            socket.emit('resume', {
                id,
            });
        }
    }
};

const clickAbortButton = (value) => {
    // get process id of the process on which pause button has been clicked
    const id = value.parentElement.getAttribute('data-process-id');

    socket.emit('abort', {
        id,
    });
};

// HTML for adding a new element to the runs
const newProcessHTML = (data) => {
    return `<div 
            class="exec-run" 
            data-process-id=${data.id} 
            data-process-status="active"
        >
        <button class="pause-button" 
            onclick="clickPauseButton(this)" 
            id="pause-${data.id}"
        >
            Pause
        </button>
        <button
            class="abort-button"
            onclick="clickAbortButton(this)"
            id="abort-${data.id}"
        >
            Abort
        </button>
        <div>
            <p class="exec-run-command">${data.command}</p>
            <p class="exec-run-date">${data.startTime}</p>
        </div>
      </div>`;
};

// for adding a new process to the frontend
socket.on('start', (data) => {
    execRuns.innerHTML = execRuns.innerHTML + newProcessHTML(data);
});

socket.on('pause', (data) => {
    document.getElementById(`pause-${data.id}`).innerText = 'Resume';
});

socket.on('resume', (data) => {
    document.getElementById(`pause-${data.id}`).innerText = 'Pause';
});
