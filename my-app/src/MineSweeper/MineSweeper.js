import React, { useState, useEffect } from "react";
import "./MineSweeper.css"; // Place all styles in this CSS file

const DuckMinesweeper = () => {
  const rows = 10;
  const cols = 10;
  const numDucks = 10;
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [flags, setFlags] = useState(0);
  const [revealedCells, setRevealedCells] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
      setIntervalId(timer);
    }
    return () => clearInterval(intervalId);
  }, [gameOver]);

  const initGame = () => {
    setTime(0);
    setGameOver(false);
    setFlags(0);
    setRevealedCells(0);

    // Generate initial grid
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        revealed: false,
        isDuck: false,
        neighborDucks: 0,
        flagged: false,
      }))
    );

    // Place ducks
    let placedDucks = 0;
    while (placedDucks < numDucks) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!newGrid[row][col].isDuck) {
        newGrid[row][col].isDuck = true;
        placedDucks++;

        // Update neighbor counts
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

    const newGrid = [...grid];
    newGrid[row][col].revealed = true;
    setRevealedCells((prev) => prev + 1);

    if (newGrid[row][col].isDuck) {
      setGameOver(true);
      clearInterval(intervalId);
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
    setFlags((prevFlags) => (newGrid[row][col].flagged ? prevFlags + 1 : prevFlags - 1));
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

    if (revealedCells === totalCells - numDucks && allDucksFlagged) {
      setGameOver(true);
      clearInterval(intervalId);
      alert("Congratulations! You won DuckSweeper!");
    }
  };

  return (
    <div className="minesweeper-container">
      <h1>DuckSweeper</h1>
      <div className="timer">Time: {time} seconds</div>
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
      <button onClick={initGame}>Restart Game</button>
    </div>
  );
};

export default DuckMinesweeper;
