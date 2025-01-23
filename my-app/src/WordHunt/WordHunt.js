import React, { useState, useEffect, useRef } from "react";
import "./WordHunt.css";
import DuckRight from "./duckRight.png";

const WordHuntGame = () => {
  const vowels = ["A", "E", "I", "O", "U"];
  const consonants = [
    "B", "C", "D", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T", "W",
  ];
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentWord, setCurrentWord] = useState("");
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wordList, setWordList] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const lineCanvasRef = useRef();
  const duckRef = useRef();

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

  useEffect(() => {
    if (isMouseDown) {
      drawLines();
    } else {
      clearLines();
    }
  }, [selectedTiles, isMouseDown]);

  const loadWords = async () => {
    try {
      const response = await fetch("fullWordList.txt");
      const text = await response.text();
      const words = text.split(/\r?\n/);
      setWordList(new Set(words.map((word) => word.toLowerCase())));
      console.log("Loaded Words:", words.slice(0, 10)); // Log first 10 words
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
    const cell = document.querySelector(`.board-cell[data-row="${row}"][data-col="${col}"]`);
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
  
    ctx.strokeStyle = "blue"; // Set line color to yellow
    ctx.lineWidth = 3; // Line thickness
    ctx.beginPath();
  
    selectedTiles.forEach((tile, index) => {
      const cell = document.querySelector(`.board-cell[data-row="${tile.row}"][data-col="${tile.col}"]`);
      if (cell) {
        const rect = cell.getBoundingClientRect();
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
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Function to calculate the score
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
  
  // Render the scoreboard and found words in the JSX
  return (
    <div className="wordhunt-container" onMouseUp={handleMouseUp}>
      <div className="scoreboard">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>
      {gameOver ? (
        <div className="game-over">Game Over! Final Score: {score}</div>
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
    </div>
  );
};

export default WordHuntGame;
