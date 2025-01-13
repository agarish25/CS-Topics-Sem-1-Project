import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Java Game Hub</a>
            <button class="navbar-toggler" type="button" data-toggler="collapse" data-target="">
                <span class="navbar-toggle-icon"></span>
            </button>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    )

}

export default NavBar;