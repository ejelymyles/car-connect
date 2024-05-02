import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, UNSAFE_ErrorResponseImpl } from "react-router-dom";
import Header from './Header';
import CarsList from "./CarsList";
import CarDetails from "./CarDetails";
import UserList from "./UserList";
import NewUserForm from "./NewUserForm";
import NewCarForm from "./NewCarForm";
import UserProfile from "./UserProfile";


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
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/owners" element={<UserList />} />
          <Route exact path="/" element={<CarsList cars={carData}/>} />
          <Route path="/newuser" element={<NewUserForm />} />
          <Route path="/newcar" element={<NewCarForm />} />
        </Routes>
      </div>
  );
}

export default App;

