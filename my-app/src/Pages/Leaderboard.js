import React, {  useContext } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { HighScoreContext } from "../Context/HighScoreContext";


const Leaderboard = () => {
    // initializes high scores to 0 for each game
    const { highScores, resetHighScores } = useContext(HighScoreContext);

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
                        <th>Duck Sweeper</th>
                        <th>{highScores.DuckSweeper} Seconds</th>
                    </tr>
                    <tr>
                        <th>Word Duck</th>
                        <th>{highScores.WordDuck} Points</th>
                    </tr>
                </tbody>
            </Table>

            <Button variant="danger"
                onClick = { resetHighScores }
            >
                RESET HIGH SCORES
            </Button>
        </Container>
    )
}

export default Leaderboard;