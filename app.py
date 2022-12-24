from flask import Flask, render_template, request, redirect, url_for, g, session, flash
from DatabaseAPI import Database
from flask_cors import CORS, cross_origin #for api-access from react

db = Database()
website = Flask(__name__)
CORS(website, resources={r"/api/*": {"origins": "*"}}) # to allow api-access to all routes for /api/-path
 
@website.route("/")
def show_user(user_name = "user1"):
    user = db.get_user_data(login=user_name, pw=user_name)
    return render_template("test_page.html", data=user)


@website.route("/api/getServices/", methods=['POST','GET', 'OPTIONS'])
#@cross_origin(allow_headers=['Content-Type']) # to allow api-access to this route
def getServices(name="No name given", sector="no sector given"):
    ## hiermit geht es über den browser, über z.b. 
    #http://localhost:5000/api/getServices/?name=Jan
    #aber irgendwie nocht über GET/POST in React--
    ##if request.values['name'] != None:
    ##    name = request.values['name']
    return {"name": name, "sector": sector}