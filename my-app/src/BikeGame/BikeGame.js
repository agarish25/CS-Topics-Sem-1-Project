import React, { useEffect, useRef, useState } from "react";
import "./BikeGame.css";

function BikeGame() {
    const gameBoardRef = useRef(null);
    const [game, setGame] = useState(null);

    useEffect(() => {
        // Define the BikeGame class inside useEffect
        class BikeGame {
            constructor(gameBoard) {
                this.gameBoard = gameBoard;
                this.numSquares = 12;
                this.squareSize = 40;
                this.topBarHeight = 45;
                this.duckIconSize = 35;
                this.squares = [];
                this.ducks = [];
                this.player = { x: 5, y: 5, direction: "up", tail: [] };
                this.currentKey = null;
                this.score = 0;
                this.gameInterval = null;

                // Images
                this.images = {
                    bike: {
                        right: this.loadImage("/images/bikeRight.png"),
                        left: this.loadImage("/images/bikeLeft.png"),
                        up: this.loadImage("/images/bikeUp.png"),
                        down: this.loadImage("/images/bikeDown.png"),
                    },
                    ducks: {
                        up: this.loadImage("/images/duckUp.png"),
                        right: this.loadImage("/images/duckRight.png"),
                        down: this.loadImage("/images/duckDown.png"),
                        left: this.loadImage("/images/duckLeft.png"),
                    },
                };

                this.init();
            }

            loadImage(src) {
                const img = new Image();
                img.src = src;
                return img;
            }

            init() {
                this.createGrid();
                this.spawnDuck();
                this.renderPlayer();
                this.startGameLoop();
                document.addEventListener("keydown", (e) => this.handleKeyPress(e));
            }

            createGrid() {
                for (let row = 0; row < this.numSquares; row++) {
                    this.squares[row] = [];
                    for (let col = 0; col < this.numSquares; col++) {
                        const square = document.createElement("div");
                        square.className = "square";
                        square.style.left = `${col * this.squareSize}px`;
                        square.style.top = `${row * this.squareSize + this.topBarHeight}px`;
                        square.style.backgroundColor =
                            (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
                                ? "rgb(0, 128, 43)"
                                : "rgb(0, 179, 60)";
                        this.gameBoard.appendChild(square);
                        this.squares[row][col] = square;
                    }
                }
            }

            handleKeyPress(event) {
                const key = event.key.toLowerCase();
                if (["w", "a", "s", "d"].includes(key)) {
                    this.currentKey = key;
                }
            }

            movePlayer() {
                const direction = this.currentKey;
                if (!direction) return;

                // Update player position
                if (direction === "w") this.player.y--;
                if (direction === "a") this.player.x--;
                if (direction === "s") this.player.y++;
                if (direction === "d") this.player.x++;

                this.checkGameOver();
                this.renderPlayer();
            }

            renderPlayer() {
                const playerImage = this.images.bike[this.player.direction];

                // Remove previous player element
                if (this.player.element) this.player.element.remove();

                const playerElement = playerImage.cloneNode();
                playerElement.style.position = "absolute";
                playerElement.style.left = `${this.player.x * this.squareSize}px`;
                playerElement.style.top = `${this.player.y * this.squareSize + this.topBarHeight}px`;
                this.gameBoard.appendChild(playerElement);
                this.player.element = playerElement;
            }

            spawnDuck() {
                const duck = { x: Math.floor(Math.random() * this.numSquares), y: Math.floor(Math.random() * this.numSquares) };
                const duckElement = this.images.ducks.right.cloneNode();
                duckElement.style.position = "absolute";
                duckElement.style.left = `${duck.x * this.squareSize}px`;
                duckElement.style.top = `${duck.y * this.squareSize + this.topBarHeight}px`;

                this.ducks.push({ ...duck, element: duckElement });
                this.gameBoard.appendChild(duckElement);
            }

            startGameLoop() {
                this.gameInterval = setInterval(() => {
                    this.movePlayer();
                }, 250);
            }

            checkGameOver() {
                if (this.player.x < 0 || this.player.y < 0 || this.player.x >= this.numSquares || this.player.y >= this.numSquares) {
                    clearInterval(this.gameInterval);
                    alert("Game Over!");
                }
            }
        }

        // Initialize the game
        if (gameBoardRef.current) {
            const newGame = new BikeGame(gameBoardRef.current);
            setGame(newGame);
        }
    }, []);

    return (
        <div>
            <div id="top-bar">Use W A S D to move</div>
            <div id="game-board" ref={gameBoardRef}></div>
        </div>
    );
}

export default BikeGame;
