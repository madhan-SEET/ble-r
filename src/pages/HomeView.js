
import React from 'react';
import { IonButton, IonDatetime } from '@ionic/react';
import { Link, Route, Routes } from "react-router-dom";

import logo from "../assets/kritsnam.jpg"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <img src={logo}  alt="logo" />
        <Link to="/loginpage">
            Login
          </Link>
       
      </header>
     
    </div>
  );
}

export default App;
