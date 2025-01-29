/*
    Ishaan Agarwal
    1/28/2025

    NavBar.js implements the navigation bar for the application, providing links to different game pages and other sections of the site.
    It uses React-Bootstrap classes for styling and layout.
*/

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

const TopNavBar = () => {
    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/">Game Ducky</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-nav-dropdown">
                    <Nav className="me-auto">

                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                Games
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/bikegamepage">Bike Game</Dropdown.Item>
                                <Dropdown.Item href="/ducksweeperpage">Duck Sweeper</Dropdown.Item>
                                <Dropdown.Item href="wordduckpage">Word Duck</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default TopNavBar;