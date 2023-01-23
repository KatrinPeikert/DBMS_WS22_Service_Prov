
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


async function addUser(credentials) {
    return fetch('/add_new_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


export default function AddUserPage() {
    const [user, setUser] = useState("");
    const [passw, setPassw] = useState("");
    const [newUser, setnewUser] = useState("not_set");
    const submitThis = async e => {
        e.preventDefault();
        var user_status = await addUser({
            user,
            passw
        });

        setnewUser(user_status["user_status"]);
        console.log(newUser);

    }
    if (newUser === "success") {
        return (
            <div class="bg-image background ">
                <h2 class="header-login" >Create a new account with us! </h2>
                <hr></hr>
                <div class="login-form" >
                    <h3 class="alert alert-success">Success!</h3>
                    <p>You can now login with this User data!</p>
                    <hr></hr>
                    <div class="link_user_page text-center">
                        <Link class="new-user-box-link" to="/"> Back to Login </Link>
                    </div>
                </div>
            </div>
        )
    }
    if (newUser === "name_error") {
        return (
            <div class="bg-image background ">
                <h2 class="header-login" >Create a new account with us! </h2>
                <hr></hr>
                <div class="login-form " >
                    <h3 class="alert alert-danger">An Error has occured!</h3>
                    <p>Your username is already taken! Please choose another one</p>
                    <hr></hr>
                    <form onSubmit={submitThis}>
                        <div class="content">
                            <div class="input-field">
                                <label htmlFor="user"> Your Username</label><br />
                                <input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                            </div>
                            <div class="input-field">
                                <label htmlFor="passw"> Your Password</label><br />
                                <input type="text" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                            </div>
                            <br />
                        </div>
                        <div class="action">
                            <button type="submit"> Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    if (newUser === "passw_error") {
        return (
            <div class="bg-image background ">
                <h2 class="header-login" >Create a new account with us! </h2>
                <hr></hr>
                <div class="login-form " >
                    <h3 class="alert alert-danger">An Error has occured!</h3>
                    <p>Your  Password has to be at least 8 characters and use at least 1 uppercase letter, 1 lowercase letter and a number</p>
                    <hr></hr>
                    <form onSubmit={submitThis}>
                        <div class="content">
                            <div class="input-field">
                                <label htmlFor="user"> Your Username</label><br />
                                <input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                            </div>
                            <div class="input-field">
                                <label htmlFor="passw"> Your Password</label><br />
                                <input type="text" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                            </div>
                            <br />
                        </div>
                        <div class="action">
                            <button type="submit"> Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div class="bg-image background ">
            <h2 class="header-login" >Create a new account with us!</h2>
            <hr></hr>

            <div class="login-form">
                <form onSubmit={submitThis}>
                    <div class="content">
                        <div class="input-field">
                            <label htmlFor="user"> Your Username</label><br />
                            <input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div class="input-field">
                            <label htmlFor="passw"> Your Password</label><br />
                            <input type="text" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                        </div>
                        <br />
                    </div>
                    <div class="action">
                        <button type="submit"> Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
};
