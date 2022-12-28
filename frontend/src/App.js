import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios"
//const axios = require('axios');

function App() {
  const request = '/api/getServices?' + new URLSearchParams({
    name: 'Testname',
    sector: 2,
});
console.log('request:', request);
  const response = fetch(request)
  .then(function (response) {
    console.log(response.json());
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(response.name);
 
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

export default App;
