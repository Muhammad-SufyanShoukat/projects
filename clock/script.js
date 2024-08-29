// script.js

let timer;
let isRunning = false;
let isSession = true;
let sessionLength = 25 * 60; // 25 minutes in seconds
let breakLength = 5 * 60; // 5 minutes in seconds
let timeLeft = sessionLength;

const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const timeLeftDisplay = document.getElementById('time-left');

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const updateDisplay = () => {
    timeLeftDisplay.textContent = formatTime(timeLeft);
};

const startTimer = () => {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        timeLeft -= 1;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            isSession = !isSession;
            timeLeft = isSession ? sessionLength : breakLength;
            startTimer();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timer);
    isRunning = false;
};

const resetTimer = () => {
    stopTimer();
    timeLeft = sessionLength;
    updateDisplay();
};

const toggleSessionBreak = (type) => {
    if (type === 'session') {
        sessionLength = prompt('Enter new session length in minutes:', sessionLength / 60) * 60;
        if (!isRunning && isSession) {
            timeLeft = sessionLength;
            updateDisplay();
        }
    } else if (type === 'break') {
        breakLength = prompt('Enter new break length in minutes:', breakLength / 60) * 60;
        if (!isRunning && !isSession) {
            timeLeft = breakLength;
            updateDisplay();
        }
    }
};

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        startStopButton.textContent = 'Start';
    } else {
        startTimer();
        startStopButton.textContent = 'Stop';
    }
});

resetButton.addEventListener('click', () => {
    resetTimer();
    startStopButton.textContent = 'Start';
});

document.getElementById('session-length').addEventListener('click', () => {
    toggleSessionBreak('session');
});

document.getElementById('break-length').addEventListener('click', () => {
    toggleSessionBreak('break');
});

// Initialize the display
updateDisplay();
