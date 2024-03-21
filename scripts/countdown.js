// Define the countdown animation function
let CountDown = (function() {

    function countDownAnimation(callback) {
        let count = 3;
        let countdownText = objects.Text({
            text: "",
            font: '24pt Arial',
            fillStyle: 'rgba(255, 255, 255, 1)', // White color
            strokeStyle: 'rgba(0, 0, 0, 1)',
            position: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 } // Center of the canvas
        });

        // Render initial count
        countdownText.updateText(count);

        let interval = setInterval(() => {
            if (count > 0) {
                console.log(count); // Output count to console (you can render it on the screen if needed)
                count--;

                // Update countdown text
                countdownText.updateText(count);

            } else {
                clearInterval(interval);
                callback(); // Execute the callback function after the countdown finishes
            }
        }, 1000); // Interval set to 1 second (1000 milliseconds) between counts

        // Function to render countdown text
        function renderCountdownText() {
            renderer.Text.render(countdownText);
        }

        // Render the initial countdown text
        renderCountdownText();
    }

    return {
        countDownAnimation: countDownAnimation
    }

}());