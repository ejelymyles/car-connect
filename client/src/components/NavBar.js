import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <div>
            <NavLink exact to ="/" className="nav-link">Home</NavLink>
            <NavLink to="/newcar" className="nav-link">List Your Car</NavLink>
            <NavLink to="/owners" className="nav-link">Find Owners</NavLink>
            <NavLink to="/newuser" className="nav-link">Add New Owner</NavLink>
        </div>
    )
}

export default NavBar;