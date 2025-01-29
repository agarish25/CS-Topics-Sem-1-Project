/*
    Ishaan Agarwal
    1/28/2025

    Home.js is the main page of the application, displaying a welcome message and a list of games with their descriptions and links to play them.
    The page employs React-Bootstrap and iterates through the games list to dynamically display game thumbnails, descriptions, and links to their respective game pages.
*/

import React, { useState } from "react";
import TopNavBar from "./Components/NavBar";
import { Link, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Figure, Row, Col, Button, Card } from "react-bootstrap";
import BikeGame from "../BikeGame/BikeGame";
import BikeGameThumbnail from "../BikeGame/BikeGameThumbnail.png";
import DuckSweeperThumbnail from "../MineSweeper/DuckSweeperThumbnail.png";
import WordDuckThumbnail from "../WordHunt/WordDuckThumbnail.png";
import WordDuckThumbnail1 from "../WordHunt/WordDuckThumbnail1.png";

const games = [
    { id: "1", name: "Bike Game", description:"Google Snake but better", gamePage:"bikegamepage", thumbnail: BikeGameThumbnail },
    { id: "2", name: "Ducksweeper", description:"Minesweeper but better", gamePage:"ducksweeperpage", thumbnail: DuckSweeperThumbnail},
    { id: "3", name: "Word Duck", description:"Word Hunt but better", gamePage:"wordduckpage", thumbnail: WordDuckThumbnail}
]


const Home = () => {
    {/* Home page text and elements */}
    return (
        <>
            
            <Container fluid className="bg-secondary text-white" style={{ padding: "20px 0" }}>
                <Row>
                <Col>
                    <h1 className="fw-bold text-center">Welcome to Game Ducky!</h1>
                    <p className="text-center">Your ultimate hub for fun and games!</p>
                </Col>
                </Row>
            </Container>

            {/* Game page thumbnails */}
            <Row className="g-4">
                {games.map((game) => (
                    <>
                    <Col key={game.id} xs={12} sm={6} md={6} lg={4}>
                        <Card style={{ width: '100%', margin: "20px 0", padding: "10px"}}>
                            <Card.Img variant="top" src={game.thumbnail} />
                            <Card.Body>
                                <Card.Title>{game.name}</Card.Title>
                                <Card.Text>
                                    {game.description}
                                </Card.Text>
                                <Button href={`/${game.gamePage}`}>Play Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    </>
                ))}
            </Row>
        </>
    )
}

export default Home;