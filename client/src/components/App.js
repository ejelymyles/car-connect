import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Header';
import CarsList from "./CarsList";
import CarDetails from "./CarDetails";


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
      <div>
        <Header />
        <Routes>
          {/* <CarsList cars={carData}/> */}
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route exact path="/" element={<CarsList cars={carData}/>} />
        </Routes>
      </div>
  );
}

export default App;

