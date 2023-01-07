import auth
from flask import Flask, render_template, request, redirect, url_for, g, session, flash, jsonify
from DatabaseAPI import Database
from flask_cors import cross_origin #for api-access from react
from bson import json_util

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
    if request.values['sector'] != None:        
        response =  db.get_service_prov_by_sector(request.values['sector'])
    else:
        response = {"status": "error"}   
    response = json_util.dumps(response)
    return response  
   
   
   
@website.route("/api/getServiceById/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type']) 
def get_service_by_id():    
    try:
        response = db.get_service_prov_by_id(int(request.values['service_id']))    
        response = json_util.dumps(response)
        return response
    except:
        response = {"status": "error"}   
 
"""    
@website.route("/api/getReviewsByID/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type']) 
def get_reviews_by_id():    
    try:
        response = db.get_reviews(int(request.values['service_id']))    
        response = json_util.dumps(response)
        return response
    except:
        response = {"status": "error"}   
    
 """   
@website.route("/api/getStarRatingByID/", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def getStarRatingByID():
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


@website.route("/api/addServices/", methods=['POST'])
@cross_origin(allow_headers=['Content-Type']) 
def addServices():
    keys = ['name', 'street', 'no', 'zip', 'city', 'sector']
    for k in keys:
        if request.values[k] =='':
            return {"status": "error", "val": k}   
    
    try:
        result = db.set_service_prov(request.values['name'], {"street":request.values['street'],"number": request.values['no'], "area_code":request.values['zip'],"city":request.values['city'] },request.values['sector'] )
        return {"status": "sucess"}
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

@website.route("/add_new_user", methods=['POST'])
def add_new_user():
    if request.method == 'POST':
        username = str(request.json["user"])
        password = str(request.json["passw"])
        
        is_user_set = db.set_user(username, password)
        if is_user_set:
            
            return jsonify({"user_status": "success"})
        else:
            return jsonify({"user_status": "name_error"})
