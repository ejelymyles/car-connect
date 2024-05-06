import React from "react";
import { NavLink } from "react-router-dom";

function UserCard({ user }){

    const{id, bio, email, location, username } = user

    return(
        <div>
            <li className="card">
                <h2>{username}</h2>
                <p>Email: {email}</p>
                <p>User ID: {id}</p>
                <p>Bio: {bio}</p>
                <p>Location: {location}</p>
                <NavLink to={`/users/${id}`} className="cardnav-link">View User Profile</NavLink>          
            </li>  
        </div>
    )
}

export default UserCard;