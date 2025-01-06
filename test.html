<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bike Game</title>
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #484848;
        }

        #game-board {
            position: relative;
            width: 480px;
            height: 525px;
            background-color: #d6d6d6;
            border: 2px solid black;
        }

        .square {
            position: absolute;
            width: 40px;
            height: 40px;
        }

        #top-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 45px;
            background-color: #484848;
            color: #d6d6d6;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 2px solid black;
        }

        .icon {
            position: absolute;
            width: 35px;
            height: 35px;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div id="game-board">
        <div id="top-bar">Use W A S D to move</div>
    </div>

    <script>
        class BikeGame {
            constructor() {
                this.gameBoard = document.getElementById("game-board");
                this.numSquares = 12;
                this.squareSize = 40;
                this.topBarHeight = 45;
                this.squares = [];
                this.ducks = [];
                this.player = { x: 5, y: 5, direction: "up" };
                this.currentKey = null;
                this.gameInterval = null;
                this.score = 0;

                this.colors = {
                    darkGreen: "rgb(0, 128, 43)",
                    lightGreen: "rgb(0, 179, 60)",
                    gray: "rgb(72, 72, 72)",
                    lightGray: "rgb(214, 214, 214)",
                };

                this.init();
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
                                ? this.colors.darkGreen
                                : this.colors.lightGreen;
                        this.gameBoard.appendChild(square);
                        this.squares[row][col] = square;
                    }
                }
            }

            renderPlayer() {
                const playerElement = document.createElement("img");
                playerElement.src = `bike${this.capitalize(this.player.direction)}.png`;
                playerElement.className = "icon";
                playerElement.style.left = `${this.player.x * this.squareSize + 2.5}px`;
                playerElement.style.top = `${this.player.y * this.squareSize + this.topBarHeight + 2.5}px`;

                this.clearPlayer();
                this.gameBoard.appendChild(playerElement);
                this.player.element = playerElement;
            }

            clearPlayer() {
                if (this.player.element) {
                    this.player.element.remove();
                }
            }

            spawnDuck() {
                const duck = { x: Math.floor(Math.random() * this.numSquares), y: Math.floor(Math.random() * this.numSquares) };
                const duckElement = document.createElement("img");
                duckElement.src = "duck.png";
                duckElement.className = "icon";
                duckElement.style.left = `${duck.x * this.squareSize + 2.5}px`;
                duckElement.style.top = `${duck.y * this.squareSize + this.topBarHeight + 2.5}px`;

                this.ducks.push({ ...duck, element: duckElement });
                this.gameBoard.appendChild(duckElement);
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

                const newPosition = { ...this.player };
                if (direction === "w") newPosition.y--;
                if (direction === "a") newPosition.x--;
                if (direction === "s") newPosition.y++;
                if (direction === "d") newPosition.x++;

                if (
                    newPosition.x >= 0 &&
                    newPosition.x < this.numSquares &&
                    newPosition.y >= 0 &&
                    newPosition.y < this.numSquares
                ) {
                    this.player = { ...newPosition, direction };
                    this.renderPlayer();
                }
            }

            checkCollisions() {
                for (let i = this.ducks.length - 1; i >= 0; i--) {
                    const duck = this.ducks[i];
                    if (this.player.x === duck.x && this.player.y === duck.y) {
                        this.ducks.splice(i, 1);
                        duck.element.remove();
                        this.score++;
                        this.spawnDuck();
                        this.updateScore();
                    }
                }
            }

            updateScore() {
                const topBar = document.getElementById("top-bar");
                topBar.innerText = `Score: ${this.score}`;
            }

            startGameLoop() {
                this.gameInterval = setInterval(() => {
                    this.movePlayer();
                    this.checkCollisions();
                }, 250);
            }

            capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
        }

        // Initialize the game
        window.onload = () => {
            new BikeGame();
        };
    </script>
</body>
</html>
