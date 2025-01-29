/*
    Ishaan Agarwal
    1/28/2025

    BikeGamePage.js displays the BikeGame component and provides the individual page for the Bike Game.
*/

import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Figure, Row, Col, Button, Card } from "react-bootstrap";
import BikeGame from "../BikeGame/BikeGame";


const BikeGamePage = () => {
    {/* BikeGame page text and elements */}
    return (
        <div>
            <BikeGame />
        </ div>
    )
}

export default BikeGamePage;