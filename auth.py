import functools
from hashlib import md5

from flask import Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from DatabaseAPI import Database

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/send', methods=('POST', 'GET'))
def send():
    session.clear()
    if request.method == 'POST':

        username = str(request.json["user"])
        password = str(request.json["passw"])
        is_Anon = str(request.json["isAnon"])
        if is_Anon:
            username= "anon"
            password="anon"
            
        db = Database()
        error = None
        user = db.get_user(username, password)
        print(user)
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


