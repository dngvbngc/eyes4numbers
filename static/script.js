var maxNum = 100;
var minNum = 1;
var total_row = 22;
var total_col = 50;
var blockSize = 25;
var board;
var context;
var counter = minNum;

var numberX;
var numberY;
var mouseX = 0;
var mouseY = 0;

const xCors = [];
const yCors = [];

var timeSince = 0;

var showHint = false;
var button;

document.addEventListener("DOMContentLoaded", function() {
    // Hint button
    button = document.getElementById("hintbutton");
    button.addEventListener("click", function(event) {
        if (!showHint) {
            showHint = true;
            button.innerHTML = "Hide hint";
        }
        else {
            showHint = false;
            button.innerHTML = "Show hint";
        }
        event.preventDefault();
    });

    window.onload = function () {
        // Set board height and width
        board = document.getElementById("board");
        board.height = total_row * blockSize + 20; // add paddings on both side so numbers don't touch border
        board.width = total_col * blockSize + 40;
        context = board.getContext("2d");

        // Set background
        context.fillStyle = "#C1E1C1";
        context.fillRect(0, 0, board.width, board.height);

        // Set number color and position
        context.font = "22px Times New Roman";
        context.fillStyle = "white";

        for (let i = minNum; i < maxNum + 1; i++) {
            placeNumber();
            // prevent number 100's tail overlap
            while (blockIsFilled(numberX + blockSize, numberY) && i == 100) {
                placeNumber();
            }
            xCors[i-1] = numberX;
            yCors[i-1] = numberY;
            context.fillText(i, numberX + blockSize, numberY + blockSize);
        }

        // Update timer
        document.getElementById("timer").innerHTML = "Seconds played: " + timeSince;
        setInterval(timer, 1000);

        // Update hint
        setInterval(update, 10);

        // Main game function
        board.addEventListener("mousedown", function(event)
        {
            var rect = board.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
            if (mouseX - blockSize <= xCors[counter-1] + blockSize
                && mouseX - blockSize >= xCors[counter-1] - blockSize
                && mouseY - blockSize <= yCors[counter-1] + blockSize
                && mouseY - blockSize >= yCors[counter-1] - blockSize) {

                // Change number's color when correct number is clicked
                context.fillStyle = "yellow";
                context.fillText(counter, xCors[counter-1] + blockSize, yCors[counter-1] + blockSize);

                // Update counter and move to next number
                counter++;
            }
        });
    }

    function timer() {
        if (counter <= maxNum) {
            timeSince++;
            document.getElementById("timer").innerHTML = "Seconds played: " + timeSince;
        }
    }

    function update() {
        // If game is finished
        if (counter > maxNum) {
            // Reduce size of board
            board.height = 500;

            context.fillStyle = "#C1E1C1";
            context.fillRect(0, 0, board.width, board.height);
            context.font = "22px Times New Roman";
            context.fillStyle = "white";
            context.textAlign = 'center';
            context.fillText("You found all the numbers!", board.width/2, board.height/2);

            document.getElementById("recordbutton").style.display = 'inline-block';
            document.getElementById("replaybutton").style.display = 'inline-block';
            document.getElementById("time").value = timeSince;

            // Hide show hint button
            document.getElementById("hint").innerHTML = "";
            button.style.visibility = 'hidden';
            return;
        }

        document.getElementById("title").innerHTML = "Can you find the " + counter + "?";
        if (showHint) {
            document.getElementById("hint").innerHTML = "Hint: " + xCors[counter-1] + ", " + yCors[counter-1];
        }
        else {
            document.getElementById("hint").innerHTML = "";
        }
    }

    function placeNumber() {
        isFilled = true;
        while (isFilled) {
            // in x coordinates.
            numberX = Math.floor(Math.random() * total_col) * blockSize;
            //in y coordinates.
            numberY = Math.floor(Math.random() * total_row) * blockSize;

            isFilled = blockIsFilled(numberX, numberY);
        }
    }

    function blockIsFilled(x, y) {
        for (let i = 0; i < xCors.length; i++) {
            if (xCors[i] == x && yCors[i] == y) {
                return true;
            }
        }
        return false;
    }
});

