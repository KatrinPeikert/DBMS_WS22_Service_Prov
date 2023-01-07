
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
    const [newUser, setnewUser] = useState(false);
    const submitThis = async e => {
        e.preventDefault();
        var user_status = await addUser({
            user,
            passw
        });

        setnewUser(user_status["user_status"]);
        console.log(newUser);

    }
    if (newUser) {
        return (
            <div class="bg-image background ">
                <h2 class="header-login" >Create a new account with us! </h2>
                <hr></hr>
                <div class="login-wrapper" >
                    <h3>Success!</h3>
                    You can now login with this User data!
                    <hr></hr>
                    <Link class=" btn new-user-box-link " to="/"> Back to Login</Link></div>
            </div>
        )
    }

    return (
        <div class="bg-image background ">
            <h2 class="header-login" >Create a new account with us!</h2>
            <hr></hr>

            <div class="login-wrapper">
                <form onSubmit={submitThis}>
                    <div>
                        <label htmlFor="user"> Your Username</label>
                        <input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="passw"> Your Password</label>
                        <input type="text" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                    </div>

                    <button class="button-login" type="submit" >Submit</button>
                </form>
            </div>
        </div>
    )
};
