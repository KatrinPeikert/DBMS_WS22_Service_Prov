import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {

  const request = new Request('http://127.0.0.1:5000/api/getServices/'); //, {method: 'POST', body: '{"name": "jan"}'}

  console.log('fetching api:', request)
  useEffect(() => {
    fetch(request)
      .then((response) => response.json())
      .then((actualData) => console.log(actualData));
  }, []);
  //const call = fetch('/getServices');
  //console.log(call);
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
