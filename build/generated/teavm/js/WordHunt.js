/*
    Matthew Fischer
    1/28/2025

    DuckMineSweeper.js is a game where the player navigates a grid, uncovering cells while avoiding hidden ducks. 
    Players must strategically flag potential duck locations and reveal safe cells to clear the board and win. 
    The game challenges your logic and planning skills with every move, making it an exciting twist on the classic Minesweeper.
*/

import React, { useState, useEffect, useRef, useContext } from "react";
import { HighScoreContext } from "../Context/HighScoreContext";
import "./WordHunt.css";
import DuckRight from "./duckRight.png";
import Words from "./fullWordList.txt";

const WordHuntGame = () => {
  const { updateHighScore } = useContext(HighScoreContext); // Get the updateHighScore function from the context

  const vowels = ["A", "E", "I", "O", "U"];
  const consonants = [
    "B", "C", "D", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T", "W",
  ];
  const [grid, setGrid] = useState([]); // Game board
  const [score, setScore] = useState(0); // Player score
  const [timeLeft, setTimeLeft] = useState(30); // Time left in the game
  const [currentWord, setCurrentWord] = useState(""); // Current word being formed
  const [selectedTiles, setSelectedTiles] = useState([]); // Selected tiles for the current word
  const [foundWords, setFoundWords] = useState([]); // Words found by the player
  const [wordList, setWordList] = useState(new Set()); // Create WordList set 
  const [gameOver, setGameOver] = useState(false);  // Game over
  const [isMouseDown, setIsMouseDown] = useState(false); // Mouse tracking
  const [gameStarted, setGameStarted] = useState(false); // Track whether the game has started
  const lineCanvasRef = useRef();
  const duckRef = useRef();
  const scoreRef = useRef(0);

  useEffect(() => { 
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (gameStarted) {
      loadWords();
      generateBoard();
      setGameOver(false);

      const timer = setInterval(() => {
        setTimeLeft((prev) => { 
          if (prev > 0) return prev - 1; 
          setGameOver(true);
          updateHighScore("WordDuck", scoreRef.current); // Updating high score
          clearInterval(timer);
          return 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (isMouseDown) {
      drawLines();
    } else {
      clearLines();
    }
  }, [selectedTiles, isMouseDown]);

  const loadWords = async () => {
    try {
      const response = await fetch(Words);
      const text = await response.text();
      const words = text.split(/\r?\n/);
      setWordList(new Set(words.map((word) => word.toLowerCase()))); // WordList
    } catch (error) {
      console.error("Error loading word list:", error); // Catching possible errors
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

    setIsMouseDown(true);
    const newWord = grid[row][col];
    setCurrentWord(newWord);
    setSelectedTiles([{ row, col }]);
    moveDuckToCell(row, col);
  };

  const handleCellMouseEnter = (row, col) => {
    if (
      !isMouseDown ||
      gameOver ||
      selectedTiles.some((tile) => tile.row === row && tile.col === col)
    )
      return;

    setCurrentWord((prev) => prev + grid[row][col]);
    setSelectedTiles((prev) => [...prev, { row, col }]);
    moveDuckToCell(row, col);
  };

  const handleMouseUp = () => {
    if (gameOver || !isMouseDown) return;

    setIsMouseDown(false);

    if (
      currentWord.length > 2 &&
      wordList.has(currentWord.toLowerCase()) &&
      !foundWords.includes(currentWord)
    ) {
      addWord(currentWord);
    }

    setCurrentWord("");
    setSelectedTiles([]);
    clearLines();
  };

  const moveDuckToCell = (row, col) => {
    const cell = document.querySelector(`.board-cell[data-row="${row}"][data-col="${col}"]`); // Moving duck to follow mouse
    if (cell && duckRef.current) {
      const rect = cell.getBoundingClientRect();
      duckRef.current.style.left = `${rect.left + rect.width / 2}px`;
      duckRef.current.style.top = `${rect.top + rect.height / 2}px`;
    }
  };

  const drawLines = () => {
    const canvas = lineCanvasRef.current;
    if (!canvas || selectedTiles.length < 2) return;
  
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "blue"; // Set line color to blue
    ctx.lineWidth = 3; // Line thickness
    ctx.beginPath();
  
    selectedTiles.forEach((tile, index) => {
      const cell = document.querySelector(`.board-cell[data-row="${tile.row}"][data-col="${tile.col}"]`);
      if (cell) {
        const rect = cell.getBoundingClientRect(); // Setting each cell
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
  
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    });
  
    ctx.stroke();
  };

  const clearLines = () => {
    const canvas = lineCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d"); // Grid
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Setting gride
    }
  };

  const calculateScore = (word) => {
    if (word.length === 3) return 100;
    if (word.length === 4) return 300;
    if (word.length === 5) return 800;
    if (word.length === 6) return 1200;
    return 2000;
  };

  const addWord = (word) => {
    if (!foundWords.includes(word)) {
      setFoundWords((prev) => [...prev, word]);
      setScore((prev) => prev + calculateScore(word));
    }
  };

  const restartGame = () => {
    setGameOver(false); // Reset game over state
    setGameStarted(false); // Temporarily stop the game
    setScore(0); // Reset the score
    setTimeLeft(30); // Reset the timer
    setFoundWords([]); // Clear found words
    setSelectedTiles([]); // Clear selected tiles
    setCurrentWord(""); // Reset the current word
    generateBoard(); // Generate a new game board
    
    // Restart the game after resetting everything
    setTimeout(() => setGameStarted(true), 100);
  };

  return (
    <div className="wordhunt-container" onMouseUp={handleMouseUp}> 
      <div className="game-header">
            <h1>Word Duck</h1>
            <p>Current Score: 0</p>
        </div>
      {!gameStarted ? (
        <button className="start-button" onClick={() => setGameStarted(true)}>
          Start Game
        </button>
      ) : (
        <>
          <div className="scoreboard">
            <p>Score: {score}</p>
            <p>Time Left: {timeLeft}s</p>
          </div>
          {gameOver ? (
            <div className="game-over">
              Game Over! Final Score: {score}
              <button className="restart-button" onClick={restartGame}>
                Restart Game
              </button>
            </div>
          ) : (
            <>
              <div className="board">
                {grid.map((row, rowIndex) =>
                  row.map((letter, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="board-cell"
                      data-row={rowIndex}
                      data-col={colIndex}
                      onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                      onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                    >
                      {letter}
                    </div>
                  ))
                )}
              </div>
              <canvas
                ref={lineCanvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              ></canvas>
              <img
                ref={duckRef}
                id="duck"
                src={DuckRight}
                alt="Duck"
                style={{
                  position: "absolute",
                  width: "50px",
                  height: "50px",
                  pointerEvents: "none",
                }}
              />
            </>
          )}
          <div className="found-words">
            <h3>Found Words</h3>
            <ul>
              {foundWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default WordHuntGame;
