import React, { createContext, useState } from "react";

// Create the context
export const HighScoreContext = createContext();

// Create a provider component
export const HighScoreProvider = ({ children }) => {
    const [highScores, setHighScores] = useState({});

    // Function to update high scores
    const updateHighScore = (game, score) => {
        setHighScores((prevScores) => {
            const currentHighScore = prevScores[game] || 0;
            if (score > currentHighScore) {
                return { ...prevScores, [game]: score };
            }
            return prevScores;
        });
    };

    return (
        <HighScoreContext.Provider value={{ highScores, updateHighScore }}>
            {children}
        </HighScoreContext.Provider>
    );
};
