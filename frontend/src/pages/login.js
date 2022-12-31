import React, { useState } from 'react';

import axios from "axios";
export default function LoginPage() {
    const [user, setUser] = useState("");
    const [passw, setPassw] = useState("");
    const submitThis = (event) => {
        const info = { "user": user, "passw": passw }
        axios.post("/auth/send", { info })
            .then(res => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); submitThis(); }}>
                <div>
                    <label htmlFor="user">user</label>
                    <input type="text" name="user" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="passw">Password</label>
                    <input type="text" name="passw" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} />
                </div>
                <button type="submit" >Login</button>
            </form>
        </div>
    )
} 