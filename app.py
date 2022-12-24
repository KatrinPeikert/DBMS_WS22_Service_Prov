from flask import Flask, render_template, request, redirect, url_for, g, session, flash
from DatabaseAPI import Database

db = Database()
website = Flask(__name__)

@website.route("/")
def show_user(user_name = "user1"):
    user = db.get_user_data(login=user_name, pw=user_name)
    return render_template("test_page.html", data=user)


@website.route("/getServices/")
def getServices(name="No name given", sector="no sector given"):
    "nur zum testen..."
    return [{"name": name, "sector": sector}] * 3