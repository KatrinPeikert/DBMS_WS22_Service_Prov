import auth
from flask import Flask, render_template, request, redirect, url_for, g, session, flash, jsonify
from DatabaseAPI import Database
from flask_cors import cross_origin #for api-access from react
from bson import json_util
import re

db = Database()
website = Flask(__name__)
website.register_blueprint(auth.auth)
website.secret_key = 'this is a very secret key'


    
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
        response = {"status": "error"}   
    response = json_util.dumps(response)
    return response



@website.route("/api/getServicesBySector/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type']) # to allow api-access to this route
def getServicesBySector():
    try:   
        response =  db.get_service_prov_by_sector(request.values['sector'])
    except:
        response = {"status": "error"}   
    response = json_util.dumps(response)
    return response  
   
   
   
@website.route("/api/getServiceById/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type']) 
def get_service_by_id():    
    try:
        response = db.get_service_prov_by_id(int(request.values['service_id'])) 
        response = list(response)[0]
        ip_hash = {"ip_hash": db.convert_uid(1, request.remote_addr)}
        response.update(ip_hash)
        response = json_util.dumps(response)
        return response
    except Exception as e:
        response = {"status": "error", "message": str(e)}   
        return response
        
 
@website.route("/api/getStarRatingByID/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def get_star_rating_by_service_id():
        service_id = int(request.values['service_id'])
        ratings  = db.get_star_ratings(service_id)
        ratings_sum = 0
        for i in ratings:
            ratings_sum += i['rating']
        try: 
            rating = ratings_sum/len(ratings)
            return {"rating": rating, "num_ratings": len(ratings)}
        except ZeroDivisionError:
            print(ZeroDivisionError)
            return {"rating": 0, "num_ratings": 0}
        except:
            return {"message": "error"}


@website.route("/api/getUserRating/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def get_star_rating_by_user_id():
    service_id = int(request.values['s_id'])
    user_id =  int(request.values['user_id'])
    rating = db.get_user_rating(user_id, service_id, request.remote_addr)
    return{"rating":rating}

@website.route("/api/getUserName", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def get_user_name():
    response = db.get_user_by_id(int(request.values['user_id']))
    print(response)
    return {"username": response['login']}


@website.route("/api/addServices/", methods=['POST'])
@cross_origin(allow_headers=['Content-Type']) 
def addServices():
    keys = ['name', 'street', 'no', 'zip', 'city', 'sector', 'additional_info']
    for k in keys:
        if request.values[k] =='' and k !='additional_info':
            return {"status": "error", "val": k}   
    
    info_dict = dict()
    try:
        try:
            additional_info = request.values['additional_info'].split("~~~")
            for i in additional_info:
                k,v = i.split("|~|")
                info_dict[k] = v
        except:
            pass
        
        result = db.set_service_prov(request.values['name'], {"street":request.values['street'],"number": request.values['no'], "area_code":request.values['zip'],"city":request.values['city'] },request.values['sector'], additional_info=info_dict )
        if result is None:
            return {"status": "Service allready exists"}
        return {"status": "OK", "service_id": result}
    except:
        return {"status": "unable to write to db." }  
    
    
    
@website.route("/api/addReview/", methods=['POST'])
@cross_origin(allow_headers=['Content-Type']) 
def add_review():
    try:
        db.add_new_review(int(request.values['service_id']),int(request.values['user_id']),request.values['text'])
        return {"status": "OK" }  
    except:
        return {"status": "unable to write to db." }  


    
@website.route("/api/addStarRating/", methods=['POST'])
@cross_origin(allow_headers=['Content-Type']) 
def add_star_rating_to_service():
    try:
        user_id = int(request.values['user_id'])
        service_id = int(request.values['service_id'])
        rating = int(request.values['rating'])
        print(user_id, service_id, rating)
        db.add_star_rating(user_id, service_id, rating, request.remote_addr)
        print("done")
        return {
            "status": "OK",            
        }
    except Exception as err:
        return {
            "status": "error",
            "message": str(err)
        }
"""        
@website.route("/api/get_usefulness_rate/", methods=['GET'])  
@cross_origin(allow_headers=['Content-Type']) 
def get_review_usefulness_rate():
    r_id = request.values['r_id']     
    num = db.get_usefulness_rate(r_id)
    return num
"""
@website.route("/api/addUsefullness/", methods=['POST'])  
@cross_origin(allow_headers=['Content-Type']) 
def update_usefulness_rate():
    try:
        r_id = request.values['r_id']     
        user_id = request.values['user_id']
        db.update_review_usefulness_rate(int(r_id),int(user_id), request.remote_addr)
        return{"status": "success"}
    except:
        return{"status": "error"}


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


def password_insecure(password_candidate:str) -> bool:
    """Checks whether password contains 1 uppercase letter, 1 lower case letter and 1 number.
        Checks whether password is at least 8 characters long.
    """
    password_insecure = False
    if len(password_candidate) > 8 and re.search(r'[0-9]', password_candidate
        )  and re.search(r'[a-z]', password_candidate) and re.search(
            r'[A-Z]', password_candidate):
        password_insecure = False
    else:
        password_insecure = True
    return password_insecure



@website.route("/add_new_user", methods=['POST'])
def add_new_user():
    if request.method == 'POST':
        username = str(request.json["user"])
        password = str(request.json["passw"])
        if password_insecure(password):
            return jsonify({"user_status": "passw_error"})
        is_user_set = db.set_user(username, password)
        if is_user_set:
            return jsonify({"user_status": "success"})
        else:
            return jsonify({"user_status": "name_error"})
