let totalSeconds = 0;
let interval = null;

// Get input fields
const inputHr = document.getElementById('input-hr');
const inputMin = document.getElementById('input-min');
const inputSec = document.getElementById('input-sec');

// Ensure that empty inputs are reset to "0" on focus out
[inputHr, inputMin, inputSec].forEach(input => {
    input.addEventListener('focusout', () => {
        if (input.value === '') {
            input.value = '0';
        }
    });
});

// Function to convert time from input fields to total seconds
function getTotalSeconds() {
    const hrs = parseInt(inputHr.value) || 0;
    const mins = parseInt(inputMin.value) || 0;
    const secs = parseInt(inputSec.value) || 0;
    return (hrs * 3600) + (mins * 60) + secs;
}

// Function to update the time in input fields
function updateInputs(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    inputHr.value = hrs;
    inputMin.value = mins;
    inputSec.value = secs;
}

// Start button functionality
document.getElementById('btn-start').addEventListener('click', () => {
    if (!interval) {
        totalSeconds = getTotalSeconds();

        if (totalSeconds <= 0) {
            alert("Please enter a valid time.");
            return;
        }

        interval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateInputs(totalSeconds);
            } else {
                clearInterval(interval);
                interval = null;
                alert("Time's up!");
            }
        }, 1000);
    }
});

// Stop button functionality
document.getElementById('btn-stop').addEventListener('click', () => {
    clearInterval(interval);
    interval = null; // Reset the interval to allow restarting later
});

// Reset button functionality
document.getElementById('btn-reset').addEventListener('click', () => {
    clearInterval(interval);
    interval = null; // Reset the interval
    inputHr.value = '0';
    inputMin.value = '0';
    inputSec.value = '0';
});
