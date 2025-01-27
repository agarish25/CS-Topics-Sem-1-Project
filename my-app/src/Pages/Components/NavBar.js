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
        
        
        /*<nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Game Ducky</a>
            <button class="navbar-toggler" type="button" data-toggler="collapse" data-target="#navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggle-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(Current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Leaderboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                </ul>
            </div>
        </nav>*/

        
    )

}

export default TopNavBar;