/*
    Matthew Fischer
    1/28/2025

    DuckMineSweeper.js is a game where the player navigates a grid, uncovering cells while avoiding hidden ducks. 
    Players must strategically flag potential duck locations and reveal safe cells to clear the board and win. 
    The game challenges your logic and planning skills with every move, making it an exciting twist on the classic Minesweeper.
*/

import React, { useState, useEffect, useContext, useRef } from "react";
import { HighScoreContext } from "../Context/HighScoreContext";
import "./MineSweeper.css";

const DuckMinesweeper = () => {
  const { updateHighScore } = useContext(HighScoreContext);

  const rows = 10;
  const cols = 10;
  const numDucks = 10;

  const [grid, setGrid] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [flags, setFlags] = useState(0);
  const [revealedCells, setRevealedCells] = useState(0);
  const [highScore, setHighScore] = useState(null); // Track high score

  const intervalRef = useRef(null); // Store the interval ID

  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Start the interval
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      // Cleanup interval on unmount or game end
      return () => clearInterval(intervalRef.current);
    }

    // Clear interval when the game ends
    if (gameOver) {
      clearInterval(intervalRef.current);
    }
  }, [gameStarted, gameOver]);

  const initGame = () => {
    setTime(0);
    setGameOver(false);
    setFlags(0);
    setRevealedCells(0);
    setGameStarted(true);

    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        revealed: false,
        isDuck: false,
        neighborDucks: 0,
        flagged: false,
      }))
    );

    let placedDucks = 0;
    while (placedDucks < numDucks) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!newGrid[row][col].isDuck) {
        newGrid[row][col].isDuck = true;
        placedDucks++;

        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
              newGrid[r][c].neighborDucks++;
            }
          }
        }
      }
    }
    setGrid(newGrid);
  };

  const startNewGame = () => {
    setGameStarted(false);
    clearInterval(intervalRef.current); // Clear the interval
    initGame();
  };

  const revealCell = (row, col) => {
    if (grid[row][col].revealed || grid[row][col].flagged || gameOver) return;

    const newGrid = [...grid];
    newGrid[row][col].revealed = true;
    setRevealedCells((prev) => prev + 1);

    if (newGrid[row][col].isDuck) {
      setGameOver(true);
      clearInterval(intervalRef.current); // Stop the timer
      revealAllDucks(newGrid);
      alert("You hit a duck! Game Over!");
    } else if (newGrid[row][col].neighborDucks === 0) {
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (r >= 0 && r < rows && c >= 0 && c < cols && !newGrid[r][c].revealed) {
            revealCell(r, c);
          }
        }
      }
    }

    checkWin(newGrid);
    setGrid(newGrid);
  };

  const flagCell = (row, col) => {
    if (grid[row][col].revealed || gameOver) return;

    const newGrid = [...grid];
    newGrid[row][col].flagged = !newGrid[row][col].flagged;
    setFlags((prevFlags) =>
      newGrid[row][col].flagged ? prevFlags + 1 : prevFlags - 1
    );
    checkWin(newGrid);
    setGrid(newGrid);
  };

  const revealAllDucks = (newGrid) => {
    newGrid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isDuck) cell.revealed = true;
      });
    });
    setGrid(newGrid);
  };

  const checkWin = (newGrid) => {
    const totalCells = rows * cols;
    const allDucksFlagged = newGrid.every((row) =>
      row.every((cell) => (cell.isDuck ? cell.flagged : true))
    );

    if (allDucksFlagged && flags === numDucks) {
      setGameOver(true);
      clearInterval(intervalRef.current);

      updateHighScore("DuckSweeper", time);

      alert(`Congratulations! You won DuckSweeper in ${time} seconds!`);
    } else if (revealedCells === totalCells - numDucks) {
      setGameOver(true);
      clearInterval(intervalRef.current);

      updateHighScore("DuckSweeper", time);

      alert(`Congratulations! You won Duck Sweeper in ${time} seconds!`);
    }
  };

  return (
    <div className="minesweeper-container">
      {!gameStarted ? (
        <div className="start-container">
          <h1>Duck Sweeper</h1>
          <p>Time: {time} seconds</p>
          {highScore !== null && <p>Best Time: {highScore} seconds</p>}
          <button className="start-button" onClick={initGame}>
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="game-header">
            <h1>Duck Sweeper</h1>
            <p>Time: {time} seconds</p>
            {highScore !== null && <p>Best Time: {highScore} seconds</p>}
          </div>
          <div className="grid">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${cell.revealed ? "revealed" : ""} ${
                    cell.flagged ? "flagged" : ""
                  } ${cell.isDuck && cell.revealed ? "duck" : ""}`}
                  onClick={() => revealCell(rowIndex, colIndex)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    flagCell(rowIndex, colIndex);
                  }}
                >
                  {cell.revealed
                    ? cell.isDuck
                      ? "🦆"
                      : cell.neighborDucks || ""
                    : cell.flagged
                    ? "🚩"
                    : ""}
                </div>
              ))
            )}
          </div>
          <div className="button-container">
            <button className="restart-button" onClick={startNewGame}>
              Restart Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DuckMinesweeper;
