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
        response =  db.get_service_prov(request.values['name'])
    else:
        response = {"message": "error"}  
    response =[{
        "sid": 1,
        "name": "Euronycs",
        "sector": "Technology",
        "address": [
            {
                "street": "Hauptstraße",
                "number": 1,
                "area_code": 123456,
                "city": "Neustadt"
            }
        ],
        "store_manager": "Max Miller"
    },
    {
        "sid": 2,
        "name": "Burger4U",
        "sector": "Food",
        "address": [
            {
                "street": "Frankfurter Straße",
                "number": 49,
                "area_code": 654321,
                "city": "Berlin"
            }
        ]
    }]
    response = jsonify({"status": "OK", "result":response})
    return response


@website.route("/api/addServices/", methods=['GET','POST'])
@cross_origin(allow_headers=['Content-Type']) 
def addServices():    
    name = request.values['name']
    return jsonify({"id": 1, "name":name})


@website.after_request
def after_request(response):
    """Buids request Header for CORS response
    by https://kurianbenoy.com/2021-07-04-CORS/
    Args:
        response (_type_): _description_
    Returns:
        _type_: _description_
    """
    allowed_origins= ['http://127.0.0.1:3000','http://localhost']
    if allowed_origins == "*":
            response.headers['Access-Control-Allow-Origin'] = "*"
    else:
            assert request.headers['Host']
            if request.headers.get("Origin"):
                response.headers["Access-Control-Allow-Origin"]  = request.headers["Origin"]
            else:
                for origin in allowed_origins:
                    if origin.find(request.headers["Host"]) != -1:
                        response.headers["Access-Control-Allow-Origin"] = origin
    return response