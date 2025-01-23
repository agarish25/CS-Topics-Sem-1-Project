import React, { useState, useEffect } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";


const Leaderboard = () => {
    // initializes high scores to 0 for each game
    const [highScores, setHighScores] = useState ({
        BikeGame: 0,
        DuckSweeper: 0,
        WordDuck: 0,
    });

    // loads high scores from localStorage
    useEffect(() => {
        const savedScores = localStorage.getItem("highScores");
        if (savedScores) {
            setHighScores(JSON.parse(savedScores));
        }
    }, []);

    // updates high scores when new score is passed
    const updateHighScore = (game, newScore) => {
        console.log(`Updating high score for ${game}. Current score: ${newScore}`);
        setHighScores((prevScores) => {
            const updatedScores = {
                ...prevScores,
                [game]: Math.max(prevScores[game], newScore),
            };

            localStorage.setItem("highScores", JSON.stringify(updatedScores));
            return updatedScores;
        });
    };

    return (
        <Container>
            <h1 className="text-center my-4">High Scores</h1>
            <Table striped border hover>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>High Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Bike Game</th>
                        <th>{highScores.BikeGame}</th>
                    </tr>
                    <tr>
                        <th>DuckSweeper</th>
                        <th>{highScores.DuckSweeper}</th>
                    </tr>
                    <tr>
                        <th>Word Duck</th>
                        <th>{highScores.WordDuck}</th>
                    </tr>
                </tbody>
            </Table>

            <Button variant="danger"
                onClick = {() => {
                    localStorage.removeItem("highScores");
                    setHighScores({ BikeGame:0, DuckSweeper:0, WordDuck:0});
                }}
            >
                RESET HIGH SCORES
            </Button>
        </Container>
    )
}

export default Leaderboard;