import React from 'react';
import CarCard from './CarCard';

function CarsList ({cars}){
    
    return(
        <div>
            <h1 className="full-list-header">Listed Cars </h1>
            <ul className="cards card-container">{cars.map((car) => <CarCard key={car.id} car={car}/>)}</ul>
        </div>
    );
}

export default CarsList;