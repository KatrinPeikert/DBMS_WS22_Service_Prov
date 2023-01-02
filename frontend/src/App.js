//import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useParams } from "react-router-dom"
import FrontPage from "./pages/frontpage"
//import LoginPage from "./pages/login"
import SearchPage from "./pages/search"
import AddService from "./pages/AddService"
import PageNotFound from "./pages/PageNotFound"
import GetServices from "./pages/queryResultList"
import ServicePage from "./pages/ServicePage"

import Layout from './components/Layout';

import useToken from './components/App/useToken.js';
import Login from './components/Login/Login';

function App() {
  const { token, setToken } = useToken();
  if ((!token) || (token === "invalid_user")) {
    return <Login setToken={setToken} />
  }
  return (
   
    <Layout>
      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/query/:type/:name/" element={<GetServices />}></Route>
        <Route path="/addService" element={<AddService />}></Route>
        <Route path="/service/:id" element={<ServicePage />}></Route>

        <Route path="/*" element={<PageNotFound />}></Route>

      </Routes>
    </Layout>


  )
}
export default App;
