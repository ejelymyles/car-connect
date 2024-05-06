import React from "react";
import { NavLink } from "react-router-dom";

function CarCard({ car }){

    const{id, mileage, price, year, model, make, description} = car

    return(
        <div>
            <li className="card">
                <h2>{year} {make} {model}</h2>
                <p> Mileage: {mileage}</p>
                <p>Price: ${price}</p>
                <p>{description}</p>
                <NavLink to={`/cars/${id}`} className="cardnav-link">View Car</NavLink>
            </li>
        </div>
    )
}

export default CarCard;