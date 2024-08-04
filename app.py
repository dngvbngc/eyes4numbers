from flask import Flask, redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URI = os.getenv('DATABASE_URI')

# Configure application
app = Flask(__name__)

# Implement the scoreboard
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Define the Score model
class Score(db.Model):
    __tablename__ = 'eyes4numbers_scores'
    id = db.Column(db.Integer, primary_key=True)
    player = db.Column(db.String(50), nullable=False)
    time_played = db.Column(db.String(50), nullable=False)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/record", methods=["GET", "POST"])
def record():
    if request.method == "POST":
        player = request.form.get("player")
        time = request.form.get("time")
        
        # Create a new Score record
        new_score = Score(player=player, time_played=time)
        
        # Add and commit the new score to the database
        db.session.add(new_score)
        db.session.commit()

        return redirect("/scoreboard")
    else:
        time = request.args.get("time", "None")
        return render_template("record.html", time=time)

@app.route("/scoreboard")
def scoreboard():
    rows = Score.query.order_by(Score.time_played).all()
    return render_template("scoreboard.html", rows=rows)

if __name__ == "__main__":
    app.run()