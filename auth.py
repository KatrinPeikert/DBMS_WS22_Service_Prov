
from flask import Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
from DatabaseAPI import Database
import requests
import ipaddress
auth = Blueprint('auth', __name__, url_prefix='/auth')


def is_google_bot(curr_user_ip: str) -> bool:
    curr_ip = ipaddress.ip_address(curr_user_ip)
    try:
        r = requests.get("https://developers.google.com/static/search/apis/ipranges/googlebot.json").json()
        for bot_network in r["prefixes"]:
            #print(ip_network.keys())
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


@auth.route('/send', methods=('POST', 'GET'))
def send():
    session.clear()
    if request.method == 'POST':
        ip_address = request.remote_addr
        if is_google_bot(ip_address):
            print("bot detected on address: ", ip_address)
            return jsonify({"token": "invalid_user"})
        
        username = str(request.json["user"])
        password = str(request.json["passw"])
        is_Anon = bool(request.json["isAnon"])
        if is_Anon == True:
            username= "anon"
            password="anon"
            
        db = Database()
        error = None
        user = db.get_user(username, password)
        if user is None:
            error = "Username or password wrong"
            return jsonify({"token": "invalid_user"})
        elif error is None:
            session.clear()
            session['user_id'] = user['uid']
            print("no error")
            return jsonify({"token": session['user_id']})

        flash(error)
        return jsonify({"token": "invalid_user"})


@auth.before_app_request
def load_logged_in_user():
    """checks if a user id is stored in the session"""
    user_id = session.get('user_id')
    print(session)
    db = Database()
    if user_id is None:
        print('No User set')
        g.user = None
    else:
        g.user = db.get_user_by_id(user_id)


@auth.route('/logout',  methods=('POST', 'GET'))
def logout():
    session.clear()
    return jsonify({})#{"token": "invalid_user"})


