import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <h1>Project Client</h1>
      </div>
    </Router>
  );
}

export default App;
