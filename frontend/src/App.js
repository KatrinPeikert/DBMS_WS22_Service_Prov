import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import {getServices}  from "./flaskApiReqests";

function App() {
  const response = getServices("Euronycs", "Technology");
  console.log(response)


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}
//        <p>{{__html: response}}</p>
export default App;
