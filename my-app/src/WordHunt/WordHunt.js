import React, { useState, useEffect } from "react";
import "./WordHuntGame.css"; // Add all the CSS styles here

const WordHuntGame = () => {
  const vowels = ["A", "E", "I", "O", "U"];
  const consonants = [
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "K",
    "L",
    "M",
    "N",
    "P",
    "R",
    "S",
    "T",
    "W",
  ];
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentWord, setCurrentWord] = useState("");
  const [selectedTiles, setSelectedTiles] = useState(new Set());
  const [foundWords, setFoundWords] = useState([]);
  const [wordList, setWordList] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    loadWords();
    generateBoard();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        setGameOver(true);
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadWords = async () => {
    try {
      const response = await fetch("fullWordList.txt");
      const text = await response.text();
      const words = text.split(/\r?\n/);
      setWordList(new Set(words.map((word) => word.toLowerCase())));
    } catch (error) {
      console.error("Error loading word list:", error);
    }
  };

  const generateBoard = () => {
    const letterCounts = {};
    const board = Array.from({ length: 4 }, () => Array(4).fill(null));

    const getRandomLetter = (isVowel) => {
      const pool = isVowel ? vowels : consonants;
      let letter;
      do {
        letter = pool[Math.floor(Math.random() * pool.length)];
      } while (letterCounts[letter] > 2);
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
      return letter;
    };

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const isPrevVowel =
          (row > 0 && vowels.includes(board[row - 1][col])) ||
          (col > 0 && vowels.includes(board[row][col - 1]));
        board[row][col] = getRandomLetter(!isPrevVowel);
      }
    }
    setGrid(board);
  };

  const handleCellMouseDown = (row, col) => {
    if (gameOver) return;
    const newWord = grid[row][col];
    setCurrentWord(newWord);
    setSelectedTiles(new Set([`${row}-${col}`]));
  };

  const handleCellMouseEnter = (row, col) => {
    if (gameOver || selectedTiles.has(`${row}-${col}`)) return;
    setCurrentWord((prev) => prev + grid[row][col]);
    setSelectedTiles((prev) => new Set(prev).add(`${row}-${col}`));
  };

  const handleMouseUp = () => {
    if (gameOver || currentWord.length < 3) return;
    if (wordList.has(currentWord.toLowerCase()) && !foundWords.includes(currentWord)) {
      setFoundWords((prev) => [...prev, currentWord]);
      setScore((prev) => prev + calculateScore(currentWord));
    }
    setCurrentWord("");
    setSelectedTiles(new Set());
  };

  const calculateScore = (word) => {
    if (word.length === 3) return 100;
    if (word.length === 4) return 300;
    if (word.length === 5) return 800;
    if (word.length === 6) return 1200;
    return 2000;
  };

  return (
    <div className="wordhunt-container">
      <div className="scoreboard">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>
      {gameOver ? (
        <div className="game-over">Game Over! Final Score: {score}</div>
      ) : (
        <div
          className="board"
          onMouseUp={handleMouseUp}
        >
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${
                  selectedTiles.has(`${rowIndex}-${colIndex}`) ? "selected" : ""
                }`}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
              >
                {letter}
              </div>
            ))
          )}
        </div>
      )}
      <div className="found-words">
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

export default WordHuntGame;
