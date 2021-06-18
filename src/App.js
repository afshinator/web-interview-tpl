import React from "react";
import logo from "./logo.png";

import "./App.css";

import { GametimeSearch } from "./features/gametime/GametimeSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <GametimeSearch />
      </main>
    </div>
  );
}

export default App;
