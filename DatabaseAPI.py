from pymongo import MongoClient
from hashlib import md5
from Levenshtein import distance as dist


def fuzzy_word_similarity(search_string:str, documents:list) -> list:
    """ Checks fuzzy similarity between search_string and the 
    names of service providers in all document of Services Collection. 
    Returns Top 10 closest matches to search_string
    """
    fuzzy_sim = []
    for doc in documents:
        serv_p = doc["name"]
        fuzzy_sim.append((dist(search_string, serv_p), doc ))
    fuzzy_sim.sort(key=lambda x: x[0])
    result = list(dict.fromkeys(([i[1]['name'] for i in fuzzy_sim])))  #to get disitnct values
    if len(result) > 10:
        return result[:9]   
    return result

class Database:
    
    def __init__(self, host: str = 'localhost', port: int = 27017, no_db=False):
        """Initiate database connection with given host and port.
        If none is given, use default settings on mongoDB installation."""

        client = MongoClient(host, port=port)
        self.db = client.ServiceProvider
        self.no_db = no_db

    def get_user(self, login: str, pw: str):
        """Return true if user:pw exists in db"""
        
        if login == "anon":
            pw_hash = pw
        else:
            pw_hash = md5(pw.encode()).hexdigest()
        return self.db.User.find_one({'login': login, 'pw': pw_hash})

    def get_user_by_id(self, uid):
        return self.db.User.find_one({'uid': uid})

    def get_user_data(self, login: str, pw: str) -> dict:
        """Get user information as dict. But not pw."""
        doc = self.get_user(login, pw)
        if doc is not None:
            return {k: doc[k] for k in {'uid', 'login'}}

    def set_user(self,  login_name: str, pwd:str) -> bool:
        """add new user"""
        user_exists = self.db.User.count_documents({"login":login_name })
        if not(user_exists):
            user_id = self.db.User.find().sort('uid', -1).limit(1)[0]['uid'] + 1
            password = md5(pwd.encode()).hexdigest()
            self.db.User.insert_one({"uid": user_id, "login": login_name, "pw":password})
            return True
        else:
            return False 

    def get_service_prov(self, name: str) -> list:
        """Checks if there exists a service provider by the given name. 
            Returns its data when it does, else returns None
        """
        service_exists = self.db.Services.count_documents({"name": name})
        if not(service_exists):
            all_documents = self.db.Services.find()
            sorted_by_similarity = fuzzy_word_similarity(name, all_documents)
            return sorted_by_similarity
        else:
            return [self.db.Services.find({"name": name})]
    
    def get_service_prov_by_sector(self, sector: str) -> list:
        """Checks if there exists a service provider by the given sector. 
            Returns its data when it does, else returns None
        """
        response =list(self.db.Services.find({"sector": sector}))
        if response[0] is not None:       

            return [response]
        else:
            return None
        
    def get_service_prov_by_id(self, id: int) -> dict:
        """Checks if there exists a service provider with the given id. 
            Returns its data when it does, else returns None
        """   
        return self.db.Services.aggregate([{"$match": {"sid": id}},
                                           {
            "$lookup": {
                "from": "Reviews",
                "localField": "sid",
                "foreignField": "id_service",
                "as": "reviews"
                }
            }
        ])
        
        #return self.db.Services.find({"sid": id})
        

    def set_service_prov(self, name: str, address: dict, sector: str, additional_info:dict = dict()) -> bool:
        """Creates a new Service Provider with given data
        """
        service_id = self.db.Services.find().sort('sid', -1).limit(1)[0]['sid'] + 1
        data = {"sid": service_id, "name": name, "address":[address], "sector":sector, "ratings":[]}
        for key in additional_info.keys():
            if not(key in data.keys()):
                data[key] = additional_info[key]
        self.db.Services.insert_one(data)
        return True
    
    def get_reviews(self, service_id: int) -> list:
        """Finds all existing reviews for a Service Provider identified by their ID
        """
        reviews_exist = self.db.Reviews.count_documents({"id_service": service_id})
        if not(reviews_exist):
           return []
        else:
            return [doc for doc in self.db.Reviews.find({"id_service": service_id})]
        

    def add_new_review(self, service_id:int, user_id:int, text:str ) -> bool:
        """Adds a new Review with given input text to Service provider with 
        service_id from user with given user_id
        """
        review_id = self.db.Reviews.find().sort('rid', -1).limit(1)[0]['rid'] + 1
        user_name = self.db.User.find({"uid":user_id})[0]["login"]
        data = {"rid":review_id,"user_id":user_id, "login_user": user_name, "text":text, "id_service": service_id, 'usefulness_rate':[]}

        self.db.Reviews.insert_one(data)
        return True
    
    def get_star_ratings(self, service_id: int) -> list:
        service = list(self.db.Services.find({"sid": service_id}))[0]
        return service['ratings']
        
    
    def add_star_rating(self,  user_id: int, service_id: int, rating: int, ip:str) -> bool:  
        """Adds a rating field if not exists with user rating
            if rating field exists, it will add or update a rating-obj for this user
        """
        save_id = self.convert_uid(user_id, ip)
        print(user_id, save_id)
        cursor = list(self.db.Services.find( {"sid": service_id, "ratings": {"$exists": True}}) )
        if (len(cursor) > 0):
            cursor = list(self.db.Services.find({"sid": service_id, "ratings":{"$elemMatch": {"user_id": save_id}}}))
            if (len(cursor) > 0): # to allow anon multiple ratings
                print("user in db")
                self.db.Services.update_one({"sid": service_id, "ratings.user_id":save_id}, {"$set": {"ratings.$.rating": rating}})
            else:
                self.db.Services.update_one({ "sid": service_id},  {"$push": { "ratings":{"user_id": save_id, "rating": rating} } })
        else:     
            print("push new review")       
            self.db.Services.update_one({ "sid": service_id},  {"$push": { "ratings":{"user_id": save_id, "rating": rating} } })
        return True
        
        
    def get_usefulness_rate(self, review_id:int) -> int:
        """ Get number of users who found this review userfull
        """
        review = list(self.db.Reviews.find({"rid": int(review_id)}))[0]
        usefulness_rate = len(review['usefulness_rate'])        
        return {"rate": usefulness_rate}
    
    
    
    def update_review_usefulness_rate(self, r_id: int,user_id: int, ip:str) -> bool:
        user_id = self.convert_uid(user_id, ip)
        cursor = list(self.db.Reviews.find({"rid": r_id, "usefulness_rate":  user_id}))
        if (len(cursor) > 0 ): 
            self.db.Reviews.update_one({"rid": r_id},{ "$pull": { 'usefulness_rate': user_id }})
        else:
                 self.db.Reviews.update_one({"rid": r_id}, {"$push": {"usefulness_rate": user_id}})
        return True
    
    
    def convert_uid(self, id: int, ip:str):
        """The anon-user has id 1. With this as input, a md5-hash of the users ip will be returned for recognizing in db
        
        lese: returns user id

        Args:
            id (int): user_id
            ip (str): ip address of user

        Returns:
            _type_: _description_
        """
        if id != 1:
            return id
        else:
            return str(md5(str(ip).encode()).hexdigest())
    
    

            
#passwords = username

if __name__ == '__main__':
    db = Database()
    print('User testing:')
    user = db.get_user_data('anon', 'anon')
    print(f'User information: {user}')
    #db.set_user("mueller", "mueller")
    print("Check Services")
    print(db.get_service_prov("Euronycs"))
    print("Add Services")
    #print(db.set_service_prov(name="Patisserie Antoinette", address={"street": "Pariser Allee", "number": 16, "area_code": 45678, "city": "Frankfurt"},sector="Food", additional_info={"store_owner": "Maria Schmitz"}))
    print("Check Reviews")
    #print(db.get_reviews(service_id=1))
    print("Add Review")
    #print(db.add_new_review(3,2, "Love the Cake!"))
