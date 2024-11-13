function startTimer() {
    // Takes the timer input and converts it into a integer
    const timerInput = document.getElementById('timerInput').value;
    let timeLeft = parseInt(timerInput);

    // Checks if the input is a number or if the value is less than or equal to 0
    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
    }

    // Changes the number within the display from 0 to whatever the user inputted
    const timeDisplay = document.getElementById('timeDisplay');
    // Inserting the value
    timeDisplay.textContent = timeLeft;

    // Setting up the countdown
    const countdown = setInterval(() => {
        // counting down
        timeLeft -= 1;
        // updating the value on the webpage
        timeDisplay.textContent = timeLeft;

        // Checking if the timer hits 0
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up!");
        }
        // Refreshing every 1 second
    }, 1000);

    // Show notification at regular intervals
    const notificationInterval = setInterval(() => {
        showNotification("This is your periodic 5 second notification!", 0);
    }, 5000); 

    // Alerting the user 
    function showNotification(message, delay) {
        setTimeout(() => {
            alert(message);
        }, delay);
    }
    showNotification("This is your notification!", 3000);
}

