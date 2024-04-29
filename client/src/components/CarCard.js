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
            </li>
            <NavLink exact to ="/" className="nav-link">View Car</NavLink>
        </div>
    )
}

export default CarCard;