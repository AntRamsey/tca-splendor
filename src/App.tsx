import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Home';


function App() {
  return (
    <div className="App m-3">
      <h1>
        TCA Splendor
      </h1>
      <h2>
        Companion App
      </h2>
      <hr />
      <Home />
    </div>
  );
}

export default App;
