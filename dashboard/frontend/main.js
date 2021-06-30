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
        const currVal = document.getElementById(
            `pauseButton-${processId}`
        ).innerText;

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

// HTML for adding a new element to the runs
const newProcessHTML = (data) => {
    return `<div 
            class="exec-run" 
            data-process-id=${data.processId} 
            data-process-status="active"
        >
        <button class="pause-button" 
            onclick="clickPauseButton(this)" 
            id="pause-${data.processId}"
        >
            Pause
        </button>
        <div>
            <p class="exec-run-command">${data.command}</p>
            <p class="exec-run-date">${data.startTime}</p>
        </div>
      </div>`;
};

// for adding a new process to the frontend
socket.on('process:start', (data) => {
    execRuns.innerHTML = execRuns.innerHTML + newProcessHTML(data);
});
