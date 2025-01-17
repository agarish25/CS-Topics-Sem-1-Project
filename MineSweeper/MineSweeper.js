// Duck Minesweeper React Component

import React, { useEffect, useState } from "react";
import "./DuckMinesweeper.css"; // Import the CSS for styling

const DuckMinesweeper = () => {
  const rows = 10;
  const cols = 10;
  const numDucks = 10;

  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [flags, setFlags] = useState(0);
  const [revealedCells, setRevealedCells] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    generateGrid();
    setStartTime(Date.now());
    const timer = setInterval(() => {
      if (!gameOver) {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, startTime]);

  const generateGrid = () => {
    let newGrid = Array.from({ length: rows }, () =>
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

  const revealCell = (row, col) => {
    if (grid[row][col].revealed || grid[row][col].flagged || gameOver) return;
    let newGrid = [...grid];
    newGrid[row][col].revealed = true;
    setRevealedCells(revealedCells + 1);

    if (newGrid[row][col].isDuck) {
      setGameOver(true);
      revealAllDucks(newGrid);
      return;
    }

    if (newGrid[row][col].neighborDucks === 0) {
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (
            r >= 0 &&
            r < rows &&
            c >= 0 &&
            c < cols &&
            !newGrid[r][c].revealed
          ) {
            revealCell(r, c);
          }
        }
      }
    }
    setGrid(newGrid);
    checkWin(newGrid);
  };

  const flagCell = (row, col) => {
    if (grid[row][col].revealed || gameOver) return;
    let newGrid = [...grid];
    newGrid[row][col].flagged = !newGrid[row][col].flagged;
    setFlags(newGrid[row][col].flagged ? flags + 1 : flags - 1);
    setGrid(newGrid);
    checkWin(newGrid);
  };

  const revealAllDucks = (newGrid) => {
    newGrid.forEach(row => {
      row.forEach(cell => {
        if (cell.isDuck) {
          cell.revealed = true;
        }
      });
    });
    setGrid(newGrid);
  };

  const checkWin = (newGrid) => {
    const totalCells = rows * cols;
    const allDucksFlagged = newGrid.every(row =>
      row.every(cell => (cell.isDuck ? cell.flagged : true))
    );

    if (revealedCells === totalCells - numDucks && allDucksFlagged) {
      setGameOver(true);
      alert("Congratulations! You won Duck Sweeper!");
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setFlags(0);
    setRevealedCells(0);
    setElapsedTime(0);
    generateGrid();
    setStartTime(Date.now());
  };

  return (
    <div className="minesweeper-container">
      <h1>Duck Minesweeper</h1>
      <div className="timer">Time: {elapsedTime} seconds</div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell.revealed ? "revealed" : ""} ${cell.flagged ? "flagged" : ""} ${
                  cell.isDuck && cell.revealed ? "duck" : ""
                }`}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  flagCell(rowIndex, colIndex);
                }}
              >
                {cell.revealed ? (cell.isDuck ? "🦆" : cell.neighborDucks || "") : cell.flagged ? "🚩" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
};

export default DuckMinesweeper;
