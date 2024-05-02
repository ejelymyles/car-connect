import React from "react";

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
        </div>
    )
}

export default UserCard;