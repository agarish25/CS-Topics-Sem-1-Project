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
            if (game == "DuckSweeper" && prevScores != 0){
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

    return (
        <HighScoreContext.Provider value={{ highScores, updateHighScore }}>
            {children}
        </HighScoreContext.Provider>
    );
};

