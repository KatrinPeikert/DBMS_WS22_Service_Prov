// header with react bootstrap
import * as React from "react";

import styled from 'styled-components';
import ReactLogo from './../logo.svg';
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation';

const HeaderStyle = styled.header`
    width: 100%;
    padding: 10px;
    display: flex;
    height: 140px;
    align-items: center;
    background-color: #A2C5AC;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`;
/* 
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
        .catch(error => {
            const navigate = useNavigate();
            navigate("/error")
        })
}
*/
export default function Header() {/*
    const navigate = useNavigate();
    const LogOut = async e => {
        e.preventDefault();
        await logoutUser();
        navigate("/")
        window.location.reload(false);


    } */
    return (<header>
        <HeaderStyle>
            <h1 >  Web application to review service providers</h1>
            
            
        </HeaderStyle>


        <Navigation />


    </header>)
}
//<div><button onClick={LogOut}> Logout</button></div>


