
from flask import Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
from DatabaseAPI import Database
import requests
import ipaddress
auth = Blueprint('auth', __name__, url_prefix='/auth')


def is_google_bot(curr_user_ip: str) -> bool:
    """ This function takes a ip-address (IPv4, IPv6) as string 
        and checks  whether this IP is on the list of google bot
        IP addresses
    """
    curr_ip = ipaddress.ip_address(curr_user_ip)
    try:
        # get current google ip addresses:
        r = requests.get("https://developers.google.com/static/search/apis/ipranges/googlebot.json").json()
        for bot_network in r["prefixes"]:
            if 'ipv6Prefix' in bot_network.keys() and "IPv6Address" in str(type(curr_ip)) :
                ip_form_network = ipaddress.ip_network(bot_network["ipv6Prefix"], strict=False)
                if curr_ip  in ip_form_network:
                    return True
            elif 'ipv4Prefix' in bot_network.keys() and "IPv4Address" in str(type(curr_ip)):
                ip_form_network = ipaddress.ip_network(bot_network["ipv4Prefix"], strict=False)
                if curr_ip  in ip_form_network:
                    return True
    except:
        return False
    return False


# this routine handels the user login
@auth.route('/send', methods=('POST', 'GET'))
def send():
    session.clear()
    if request.method == 'POST':
        ip_address = request.remote_addr
        # check ip adress
        if is_google_bot(ip_address):
            print("bot detected on address: ", ip_address)
            return jsonify({"token": "invalid_user"})
        
        # obtain posted data
        username = str(request.json["user"])
        password = str(request.json["passw"])
        
        # special case: login anonymously
        is_Anon = bool(request.json["isAnon"])
        if is_Anon == True:
            username= "anon"
            password="anon"
            
        db = Database()
        error = None
        user = db.get_user(username, password)
        if user is None:
            # if username does not exist or password has an error
            error = "Username or password wrong"
            return jsonify({"token": "invalid_user"})

        elif error is None:
            # successful login
            session.clear()
            session['user_id'] = user['uid']
            print("no error")
            return jsonify({"token": session['user_id']})

        flash(error)
        return jsonify({"token": "invalid_user"})

# this routine prevents any actions efore a user is logged in
@auth.before_app_request
def load_logged_in_user():
    """checks if a user id is stored in the session"""
    user_id = session.get('user_id')
    print("load_logged_in_user", session)
    db = Database()
    if user_id is None:
        print('No User set')
        g.user = None
    else:
        g.user = db.get_user_by_id(user_id)


# this routine handels the logout and removes all saved session data
@auth.route('/logout',  methods=('POST', 'GET'))
def logout():
    session.clear()
    return jsonify({})

