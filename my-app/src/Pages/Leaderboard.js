import React, { useState, useEffect, useContext } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { HighScoreContext } from "../Context/HighScoreContext";


const Leaderboard = () => {
    // initializes high scores to 0 for each game
    const { highScores, updateHighScore } = useContext(HighScoreContext);

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
                        <th>{highScores.BikeGame} Ducks</th>
                    </tr>
                    <tr>
                        <th>DuckSweeper</th>
                        <th>{highScores.DuckSweeper} Seconds</th>
                    </tr>
                    <tr>
                        <th>Word Duck</th>
                        <th>{highScores.WordDuck} Seconds</th>
                    </tr>
                </tbody>
            </Table>

            <Button variant="danger"
                onClick = {() => {
                    localStorage.removeItem("highScores");
                    updateHighScore("BikeGame", 0);
                    updateHighScore("DuckSweeper", 0);
                    updateHighScore("WordDuck", 0);
                }}
            >
                RESET HIGH SCORES
            </Button>
        </Container>
    )
}

export default Leaderboard;