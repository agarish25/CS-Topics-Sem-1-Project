import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Figure, Row, Col, Button, Card } from "react-bootstrap";
import BikeGame from "../BikeGame/BikeGame";


const BikeGamePage = () => {

    return (
        <>
            <BikeGame />
        </>
    )
}

export default BikeGamePage;