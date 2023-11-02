# EYES 4 NUMBERS
#### Description: Built with HTML, CSS and Javascript, this project is a simple number-finding game to kill time and relax.

### How to run the game:
To download the necessary packages, run `pip install -r -requirements.txt` (Windows) or `pip3 install -r -requirements.txt` (Linux) in your terminal.
Run the command `flask run` in this directory and open the link that appears on any web browser.

### How to play the game:

Upon opening the link, the game is automatically started and timed. Look for the numbers from 1 to 100 in chronological order and click on them as you find their location on the green game board. Once you find the number, the game title will update to tell you the next number to find, and the old number will turn yellow to indicate it has been found.

If you are stuck, click the "Show hint" button below the board to receive the approximate x and y-coordinates of the number on the board. You can then hide the hint by clicking the "Hide hint" button.

Once the game is finished, you can record your score by clicking the "Record score" button below the game board. You will be prompted to enter your name, and your entry will appear on the scoreboard that you will automatically be directed to upon submission. The scores are players' times, ordered from least taken to most. You can also click the "Replay" button, or refresh the page, to play the game again. Any finished game that the player does not submit their score for will not be recorded in the scoreboard.

### Folders & files in this repository:

1. `static`: handles the back & front end of the website
- `script.js`: the Javascript code that formats and manipulates the game board. This script also takes care of timing the game and randomly placing the numbers on the scoreboard.
- `styles.css`: contains the CSS code that formats the front end of website

2. `templates`: handles the front end of the website
- `layout.html`: the general layout for the other html files to extend upon
- `index.html`: contains the main game interface
- `record.html`: contains the record score interface, with a simple form that has an input field for the player's name and a submit button
- `scoreboard.html`: contains the scoreboard interface, with a simple table that shows all submitted players' names and scores

3. `app.py`: Using SQL, this python script handles the collection and distribution of data (e.g the player's score and name) between the different routes to the website. Data is collected and put into `scoreboard.db`. With Flask, this script also handles rendering of html files into their correct routes.

4. `scoreboard.db`: This database keeps the names and scores of players who finished the game, and is the data that will be shown on `\scoreboard`.

### Help & collaboration:

- `script.js` was built with reference to code from Geeks for Geeks' Snake Game.
- `scoreboard.html` and `styles.css` has elements from CS50's Birthday Lab source code (the formatting of the table).

### Customizing the game:

- Change the game board's color: go to `script.js` and modify the `board.fillColor()` methods.
- Change the maximum number on the board: go to `script.js` and modify the `maxNum` variable.
