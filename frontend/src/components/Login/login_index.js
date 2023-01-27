import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"


import Login from "./Login"
import useToken from '../App/useToken.js';

import AdduserPage from "./adduser"


export default function LoginIndex() {

    const { token, setToken } = useToken();
    return (

        <LoginLayout>
            <Routes>
                <Route path="/" element={<Login setToken={setToken} />} />
                <Route path="/new_user" element={<AdduserPage />} />
                <Route path="/*" element={<Login setToken={setToken} />} />
            </Routes>
        </LoginLayout>
    )
};


const LoginLayout = ({ children }) => {
    return (
        <React.Fragment>
            {children}

        </React.Fragment>
    );
};

