import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import gameDuckyLogo from "../Game Ducky.png";


const About = () => {

    return (
        <Container className="text-center py-5">
            <Row className="justify-content-center mb-4">
                <Col md={6}>
                <Image src={gameDuckyLogo} alt="Game Ducky Logo" fluid roundedCircle />
                </Col>
            </Row>
            
            <h1 className="mb-4">About Game Ducky</h1>
            <p className="lead">
                Welcome to the world of Game Ducky, where fun meets creativity and every moment is filled with excitement! Whether you're hunting for words, uncovering hidden ducks, or riding alongside a growing duck train, our collection of Ducky-themed games offers something for everyone.
            </p>
            
            <Row className="gy-4">
                <Col md={4}>
                    <Card className="h-100">
                        <Card.Body>
                        <Card.Title>🚴 Bike Game</Card.Title>
                        <Card.Text>
                            Embark on a wild biking journey through the grid, collecting ducks to form a growing tail. Inspired by the classic Snake game, this high-speed adventure requires precision and planning!
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
               
                

                <Col md={4}>
                <Card className="h-100">
                    <Card.Body>
                    <Card.Title>🦆 Duck Sweeper</Card.Title>
                    <Card.Text>
                        Put your logic and strategy to the test in this duck-themed twist on classic Minesweeper. Uncover cells, flag potential duck squares, and clear the board to win!
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={4}>
                <Card className="h-100">
                    <Card.Body>
                    <Card.Title>🦆 Word Ducky</Card.Title>
                    <Card.Text>
                        Challenge your vocabulary skills in this engaging word puzzle game. Navigate a 4x4 grid, connecting letters to form words while your duck mascot follows your every move. Strategy and speed are key!
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                
            </Row>

            <h2 className="mt-5">Why Game Duck?</h2>
            <p className="lead">
                At Game Duck, our goal is to deliver fun experiences with a bit of rigor. Our games are designed to challenge your brain, encourage creativity, and offer endless replayability for all ages.
            </p>
        </Container>
    )
}

export default About;