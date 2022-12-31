import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

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
    const [isAnon, setIsAnon] = useState(false)
    const submitThis = async e => {
        e.preventDefault();
        const token = await loginUser({
            user,
            passw,
            isAnon
        });
        setToken(token);
    }
    return (
        <div><h2 >Login Page</h2>
            <div className="login-wrapper">
                <form onSubmit={submitThis}>
                    <div>
                        <label htmlFor="user">Username</label>
                        <input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="passw">Password</label>
                        <input type="text" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                    </div>
                    <h2 >OR</h2>
                    <input type="checkbox" id="anon" checked={isAnon} onChange={(e) => setIsAnon(!isAnon)} />
                    <span>Log In Anonymous</span>
                    <button type="submit" >Login</button>
                </form>
            </div>
        </div>
    )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}