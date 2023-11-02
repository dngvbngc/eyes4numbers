from cs50 import SQL

from flask import Flask, redirect, render_template, request

# Configure application
app = Flask(__name__)

# Implement the scoreboard
db = SQL("sqlite:///scoreboard.db")

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/record", methods=["GET", "POST"])
def record():
    if request.method == "POST":
        player = request.form.get("player")
        time = request.form.get("time")
        db.execute("INSERT INTO scores (player, time_played) VALUES (?, ?);", player, time)
        return redirect("/scoreboard")
    else:
        time = request.args.get("time", "None")
        return render_template("record.html", time=time)

@app.route("/scoreboard")
def scoreboard():
    rows = db.execute("SELECT * FROM scores ORDER BY time_played;")
    return render_template("scoreboard.html", rows=rows)

if __name__ == "__main__":
    app.run()