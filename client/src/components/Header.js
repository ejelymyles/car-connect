import React from "react";
import NavBar from "./NavBar";

function Header(){
    return (
        <div className="header">
            <h1 className="header-title">Welcome to Car Connect!</h1>
            <h4 className="header-subtitle">Buy, Rent, and Sell your cars!</h4>
            <NavBar />
            <hr className="breakline"/>
        </div>
    );
}

export default Header;