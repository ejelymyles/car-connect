import React, { useState, useEffect} from 'react';
import CarCard from './CarCard';

function CarsList ({cars}){

    // const [carData, setCarData] = useState([])

    // useEffect(() => {
    //     fetch("/cars")
    //     .then((r) =>r.json())
    //     .then((cars) => {
    //       setCarData(cars);
    //     })
    //   }, [])

    return(
        <div>
            <h1 className="full-list-header">Listed Cars </h1>
            <ul className="cards card-container">{cars.map((car) => <CarCard key={car.id} car={car}/>)}</ul>
        </div>
    );
}

export default CarsList;