import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
async function loginUser(credentials) {
    return fetch('/auth/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function LoginPage({ setToken }) {
    const [user, setUser] = useState("");
    const [passw, setPassw] = useState("");
    const [isAnon, setIsAnon] = useState(false);
    const submitThis = async e => {
        e.preventDefault();
        const token = await loginUser({
            user,
            passw,
            isAnon
        });      

        console.log("token", token)
        setToken(token);
        window.location.reload(false);
    }
    return (

        <div >
            <div class="row">
                <h2 class="header-login">Web application to review service providers</h2> <hr></hr>
            </div>



            <div class="login-form">
                <form onSubmit={submitThis}>
                    <h1>Login</h1>
                    <div class="content">
                        <div class="input-field">
                            <label htmlFor="user">Username</label>
                            <input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div class="input-field">
                            <label htmlFor="passw">Password </label><br />
                            <input type="password" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                        </div>
                        <input type="checkbox" id="anon" checked={isAnon} onChange={(e) => setIsAnon(!isAnon)} /> <span>Log In Anonymous</span><br />
                    </div>
                    <div class="action">
                        <button type="submit"> Login</button>
                    </div>
                </form>

                <div class="link_user_page text-center">
                    <Link class="new-user-box-link" to="/new_user"> Create a new User Account </Link>
                </div>


            </div>


        </div>


    )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}

