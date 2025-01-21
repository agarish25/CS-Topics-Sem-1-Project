import React, { useEffect, useRef, useState } from "react";

const WordHunt = () => {
    const gameBoardRef = useRef(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    const [grid, setGrid] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const wordList = useRef(new Set()); // Store word list as a Set for fast lookup

    const vowels = ["A", "E", "I", "O", "U"];
    const consonants = [
        "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W", "Y"
    ];

    useEffect(() => {
        // Load word list
        fetch("./fullWordList.txt")
            .then((response) => response.text())
            .then((data) => {
                wordList.current = new Set(data.split("\n").map((word) => word.trim().toLowerCase()));
            });

        generateBoard();
        startTimer();
    }, []);

    const generateBoard = () => {
        const newGrid = Array(4)
            .fill(null)
            .map(() => Array(4).fill(null));

        const letterCounts = {};

        const getRandomLetter = (isVowel) => {
            const pool = isVowel ? vowels : consonants;
            let letter;

            do {
                letter = pool[Math.floor(Math.random() * pool.length)];
            } while (letterCounts[letter] >= 3);

            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
            return letter;
        };

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const isPrevVowel =
                    (row > 0 && vowels.includes(newGrid[row - 1][col])) ||
                    (col > 0 && vowels.includes(newGrid[row][col - 1]));

                const letter = getRandomLetter(!isPrevVowel);
                newGrid[row][col] = letter;
            }
        }

        setGrid(newGrid);
    };

    const startTimer = () => {
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timerInterval);
                    endGame();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleMouseDown = (row, col) => {
        setCurrentWord(grid[row][col]);
    };

    const handleMouseEnter = (row, col) => {
        setCurrentWord((prevWord) => prevWord + grid[row][col]);
    };

    const handleMouseUp = () => {
        if (currentWord.length > 0 && wordList.current.has(currentWord.toLowerCase())) {
            if (!foundWords.includes(currentWord)) {
                setFoundWords((prevWords) => [...prevWords, currentWord]);
                updateScore(currentWord.length);
            }
        }
        setCurrentWord(""); // Reset the current word
    };

    const updateScore = (wordLength) => {
        if (wordLength === 3) setScore((prevScore) => prevScore + 100);
        else if (wordLength === 4) setScore((prevScore) => prevScore + 300);
        else if (wordLength === 5) setScore((prevScore) => prevScore + 800);
        else if (wordLength === 6) setScore((prevScore) => prevScore + 1200);
        else setScore((prevScore) => prevScore + 2000);
    };

    const endGame = () => {
        alert(`Game Over! Final Score: ${score}`);
    };

    return (
        <div className="game-wrapper">
            <div id="top-bar">Score: {score} | Time Left: {timeLeft}s</div>
            <div id="game-board" ref={gameBoardRef}>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((letter, colIndex) => (
                            <div
                                key={colIndex}
                                className="cell"
                                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                onMouseUp={handleMouseUp}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div id="found-words">
                <h3>Found Words</h3>
                <ul>
                    {foundWords.map((word, index) => (
                        <li key={index}>{word}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WordHunt;
