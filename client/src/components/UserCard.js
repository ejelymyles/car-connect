import React from "react";
import { NavLink } from "react-router-dom";

function UserCard({ user }){

    const{id, bio, email, location, username } = user

    return(
        <div>
            <li className="card">
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>User ID: {id}</p>
                <p>Bio: {bio}</p>
                <p>Location: {location}</p>
            </li>  
            <NavLink to={`/users/${id}`} className="nav-link">View User Profile</NavLink>          
        </div>
    )
}

export default UserCard;