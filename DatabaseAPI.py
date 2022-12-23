from pymongo import MongoClient
from hashlib import md5


class Database:

    def __init__(self, host: str = 'localhost', port: int = 27017, no_db=False):
        """Initiate database connection with given host and port.
        If none is given, use default settings on mongoDB installation."""

        client = MongoClient(host, port=port)
        self.db = client.ServiceProvider
        self.no_db = no_db

    def get_user(self, login: str, pw: str):
        """Return true if user:pw exists in db"""
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

    def get_service_prov(self, name: str) -> dict:
        """Checks if there exists a service provider by the given name. 
            Returns its data when it does, else returns None
        """
        return

    def set_service_prov(self, name: str, address: dict, sector: str, additional_info:dict = dict()) -> bool:
        """Creates a new Service Provider with given data
        """
        return
    
    def get_reviews(self, service_id: str) -> list:
        """Finds all existing reviews for a Serive Provider identified by their ID
        """
        return

    def add_new_review(self, service_id:str, user_id:str, text: str ) -> bool:
        """Adds a new Review with given input text to Service provider with 
        service_id from uuer with given user_id
        """
        return

#passwords = username

if __name__ == '__main__':
    db = Database()
    print('User testing:')
    user = db.get_user_data('user1', 'user1')
    print(f'User information: {user}')
    db.set_user("mueller", "mueller")

