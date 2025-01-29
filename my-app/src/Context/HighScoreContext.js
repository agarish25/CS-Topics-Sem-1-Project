/*
    Ishaan Agarwal
    1/28/2025

    HighScoreContext.js manages high scores for Game Ducky, storing and updating them in localStorage.
    It supports per-game score tracking, with special logic for DuckSweeper (lower is better).
*/

import React, { createContext, useState, useEffect } from "react";

// Create the context
export const HighScoreContext = createContext();

// HighScoreContext Provider component
export const HighScoreProvider = ({ children }) => {
    const [highScores, setHighScores] = useState({
        BikeGame: 0,
        DuckSweeper: 0,
        WordDuck: 0,
    });

    // Load high scores from localStorage
    useEffect(() => {
        const savedScores = localStorage.getItem("highScores");
        if (savedScores) {
            setHighScores(JSON.parse(savedScores));
        }
    }, []);

    // Update high score for a specific game
    const updateHighScore = (game, newScore) => {
        console.log(`Updating high score for ${game}. Current score: ${newScore}`);
        setHighScores((prevScores) => {
            let operator = Math.max;
            if (game === "DuckSweeper" && prevScores[game] !== 0){
                operator = Math.min;
            };

            const updatedScores = {
                ...prevScores,
                [game]: operator(prevScores[game], newScore),
            };

            localStorage.setItem("highScores", JSON.stringify(updatedScores));
            return updatedScores;
        });
    };

    const resetHighScores = () => {
        const resetScores = {
            BikeGame: 0,
            DuckSweeper: 0,
            WordDuck: 0,
        };
        localStorage.setItem("highScores", JSON.stringify(resetScores));
        setHighScores(resetScores);
    };

    return (
        <HighScoreContext.Provider value={{ highScores, updateHighScore, resetHighScores }}>
            {children}
        </HighScoreContext.Provider>
    );
};

