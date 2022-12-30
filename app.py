from flask import Flask, render_template, request, redirect, url_for, g, session, flash, jsonify
from DatabaseAPI import Database
from flask_cors import cross_origin #for api-access from react

db = Database()
website = Flask(__name__)



@website.route("/")
def show_user(user_name = "user1"):
    user = db.get_user_data(login=user_name, pw=user_name)
    return render_template("test_page.html", data=user)


@website.route("/api/getServices/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type']) # to allow api-access to this route
def getServices():
    if request.values['name'] != None:
        name = request.values['name']
    else:
        name = "error"
    if request.values['name'] != None:
        sector = request.values['sector']
    else:
        sector="error"
    response = jsonify({'name': name, 'sector':sector})
    return response
