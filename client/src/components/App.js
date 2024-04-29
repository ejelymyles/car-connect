import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header';
import CarsList from "./CarsList";


function App() {

  const [carData, setCarData] = useState([])

  useEffect(() => {
      fetch("/cars")
      .then((r) =>r.json())
      .then((cars) => {
        setCarData(cars);
      })
    }, [])

  return (
    <Router>
      <div>
        <Header />
        <CarsList cars={carData} />
      </div>
    </Router>
  );
}

export default App;
