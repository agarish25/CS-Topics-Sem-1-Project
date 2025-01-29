/*
    Matthew Fischer
    1/28/2025

    BikeGame.js is a game where the player is a bike and must collect ducks. 
    The player can move up, down, left, and right. The player must avoid the edges of the game board.
    The player must also collect ducks to increase their score. This game is converted from BikeGame.java
    using a TeaVM compiler.
*/

import React, { useEffect, useRef, useState, useContext } from "react";
import { HighScoreContext } from "../Context/HighScoreContext";
import "./BikeGame.css";

import duckRight from "./duckRight.png";
import duckLeft from "./duckLeft.png";
import duckUp from "./duckUp.png";
import duckDown from "./duckDown.png";

import bikeRight from "./bikeRight.png";
import bikeLeft from "./bikeLeft.png";
import bikeUp from "./bikeUp.png";
import bikeDown from "./bikeDown.png";

function BikeGame() {
  const { updateHighScore } = useContext(HighScoreContext);

  const gameBoardRef = useRef(null);
  const scoreRef = useRef(0); // keeps track of score in real-time
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gameInstanceRef = useRef(null); // stores the game instance

  // function to handle game over
  const endGame = () => {
    alert(`Game Over with score of ${scoreRef.current}`);
    updateHighScore("BikeGame", scoreRef.current);
    setGameStarted(false);
    setScore(0); // reset state score
    scoreRef.current = 0; // reset ref score
    if (gameInstanceRef.current) {
      clearInterval(gameInstanceRef.current.gameInterval); // stop any running game loop
      gameInstanceRef.current = null; // reset game instance
    }
  };

  // function to start the game
  const startGame = () => {
    setScore(0);
    scoreRef.current = 0;
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted && gameBoardRef.current) {
      class BikeGame {
        constructor(gameBoard, updateScore, endGameCallback) {
          this.gameBoard = gameBoard;
          this.updateScore = updateScore;
          this.endGameCallback = endGameCallback;

          this.numSquares = 12; // grid size
          this.squareSize = 40; // size of each cell
          this.duckIconSize = 35;
          this.player = { x: 5, y: 5, direction: "up", element: null };
          this.ducks = [];
          this.gameInterval = null;

          this.images = {
            bike: {
              right: bikeRight,
              left: bikeLeft,
              up: bikeUp,
              down: bikeDown,
            },
            ducks: {
              right: duckRight,
              left: duckLeft,
              up: duckUp,
              down: duckDown,
            },
          };

          this.init();
        }

        // initialize the game
        init() {
          this.createGrid();
          this.spawnDuck();
          this.renderPlayer();
          this.startGameLoop();
          document.addEventListener("keydown", (e) => this.handleKeyPress(e));
        }

        // create the game board/grid
        createGrid() {
          this.gameBoard.innerHTML = ""; // clear previous game board
          this.gameBoard.style.position = "relative";
          this.gameBoard.style.width = `${this.numSquares * this.squareSize}px`;
          this.gameBoard.style.height = `${this.numSquares * this.squareSize}px`;
          this.gameBoard.style.backgroundColor = "#d6d6d6";
          this.gameBoard.style.border = "2px solid black";

          for (let row = 0; row < this.numSquares; row++) {
            for (let col = 0; col < this.numSquares; col++) {
              const square = document.createElement("div");
              square.style.position = "absolute";
              square.style.width = `${this.squareSize}px`;
              square.style.height = `${this.squareSize}px`;
              square.style.left = `${col * this.squareSize}px`;
              square.style.top = `${row * this.squareSize}px`;
              square.style.backgroundColor =
                (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
                  ? "rgb(0, 128, 43)"
                  : "rgb(0, 179, 60)";
              this.gameBoard.appendChild(square);
            }
          }
        }

        // handle movement inputs
        handleKeyPress(event) {
          const key = event.key.toLowerCase();
          if (["w", "a", "s", "d"].includes(key)) {
            if (key === "w" && this.player.direction !== "down") this.player.direction = "up";
            else if (key === "a" && this.player.direction !== "right") this.player.direction = "left";
            else if (key === "s" && this.player.direction !== "up") this.player.direction = "down";
            else if (key === "d" && this.player.direction !== "left") this.player.direction = "right";
          }
        }

        // start the game loop
        startGameLoop() {
          this.gameInterval = setInterval(() => {
            this.movePlayer();
            this.renderPlayer();
            this.checkCollisions();
          }, 250);
        }

        // move player based on direction
        movePlayer() {
          if (this.player.direction === "up") this.player.y--;
          else if (this.player.direction === "down") this.player.y++;
          else if (this.player.direction === "left") this.player.x--;
          else if (this.player.direction === "right") this.player.x++;

          // check if player hits the wall
          if (
            this.player.x < 0 ||
            this.player.y < 0 ||
            this.player.x >= this.numSquares ||
            this.player.y >= this.numSquares
          ) {
            clearInterval(this.gameInterval);
            this.endGameCallback();
          }
        }

        // render player on the board
        renderPlayer() {
          const playerImage = this.images.bike[this.player.direction];

          if (this.player.element) {
            this.player.element.remove();
          }

          const playerElement = document.createElement("img");
          playerElement.src = playerImage;
          playerElement.style.position = "absolute";
          playerElement.style.width = `${this.duckIconSize}px`;
          playerElement.style.height = `${this.duckIconSize}px`;
          playerElement.style.left = `${this.player.x * this.squareSize}px`;
          playerElement.style.top = `${this.player.y * this.squareSize}px`;

          this.gameBoard.appendChild(playerElement);
          this.player.element = playerElement;
        }

        // spawn a duck at a random location
        spawnDuck() {
          let duck;
          do {
            duck = {
              x: Math.floor(Math.random() * this.numSquares),
              y: Math.floor(Math.random() * this.numSquares),
            };
          } while (this.player.x === duck.x && this.player.y === duck.y);

          const duckElement = document.createElement("img");
          duckElement.src = this.images.ducks.right;
          duckElement.style.position = "absolute";
          duckElement.style.width = `${this.duckIconSize}px`;
          duckElement.style.height = `${this.duckIconSize}px`;
          duckElement.style.left = `${duck.x * this.squareSize}px`;
          duckElement.style.top = `${duck.y * this.squareSize}px`;

          this.ducks.push({ ...duck, element: duckElement });
          this.gameBoard.appendChild(duckElement);
        }

        // check for collisions with ducks
        checkCollisions() {
          for (let i = this.ducks.length - 1; i >= 0; i--) {
            const duck = this.ducks[i];
            if (this.player.x === duck.x && this.player.y === duck.y) {
              this.ducks.splice(i, 1);
              duck.element.remove();

              const newScore = scoreRef.current + 1;
              this.updateScore(newScore);
              scoreRef.current = newScore;

              this.spawnDuck();
            }
          }
        }
      }

      gameInstanceRef.current = new BikeGame(gameBoardRef.current, (newScore) => {
        setScore(newScore);
        scoreRef.current = newScore;
      }, endGame);
    }

    return () => {
      if (gameInstanceRef.current) {
        clearInterval(gameInstanceRef.current.gameInterval);
        gameInstanceRef.current = null;
      }
    };
  }, [gameStarted]);

  // render the game
  return (
    <div className="game-wrapper">
      <div className="game-header">
        <h1>Bike Game</h1>
        <p>Current Score: {score}</p>
      </div>
      {!gameStarted && <button className="start-button" onClick={startGame}>Start Game</button>}
      {gameStarted && (
        <div>
          <div id="game-board" ref={gameBoardRef}></div>
          <button className="start-button" onClick={endGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default BikeGame;
