import functools
from hashlib import md5

from flask import Blueprint, flash, g, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash
from DatabaseAPI import Database

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/send', methods=('POST', 'GET'))
def send():
    if request.method == 'POST':
        data = request.json["info"]
        username = str(data["user"])
        password = str(data["passw"])

        db = Database()
        error = None
        user = db.get_user(username, password)
        print(user)
        if user is None:
            error = "Username or password wrong"
        elif error is None:
            session.clear()
            session['user_id'] = user['uid']
            print("no error")
            # TODO: Now to the content of the page
            #return redirect(url_for('index'))

        flash(error)

    return render_template("test_page.html", data=user)


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


@auth.route('/logout')
def logout():
    session.clear()
    # TODO: Back to Login Screen


