// header with react bootstrap
import * as React from "react";

import styled from 'styled-components';
import ReactLogo from './../logo.svg';

const HeaderStyle = styled.header`
    color: #880D1E;
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 140px;
    position: fixed;
    align-items: center;
    background-color: #A2C5AC;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`;

async function logoutUser() {
    sessionStorage.removeItem("token");
    return fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(data => data.json())
}

export default function Header() {
    const LogOut = async e => {
        e.preventDefault();
        await logoutUser();
        window.location.reload(false);
    }
    return (<header>
        <HeaderStyle>
            <img src={ReactLogo} alt="" height="120" />
            <h1 >Site-Title</h1>
            <button onClick={LogOut}> Logout</button>
        </HeaderStyle>



    </header>)
}


