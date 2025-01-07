package TestBike;

import org.teavm.jso.dom.html.*;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.core.JSNumber;
import org.teavm.jso.dom.html.HTMLDivElement;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.JSBody;
import org.teavm.jso.dom.events.KeyboardEvent;

public class TestBike {

    private static final int NUM_SQUARES = 12;
    private static final int SQUARE_SIZE = 40;
    private static final int TOP_BAR_WIDTH = 45;
    private static final int GAME_REFRESH_RATE = 250;

    private final int[][] game = new int[NUM_SQUARES][NUM_SQUARES];
    private HTMLDivElement[][] squares;
    private long start;
    private char currentKey = ' ';
    private HTMLDivElement gameContainer;
    private HTMLDivElement scoreBoard;
    private HTMLDivElement gameBoard;

    public static void main(String[] args) {
        new TestBike().startGame();
    }

    private void startGame() {
        HTMLDocument document = HTMLDocument.current();
        document.getBody().setInnerHTML(""); // Clear body content

        // Initialize the game
        initializeGameGrid(document);

        // Initialize the game loop
        gameLoop();
    }

    private void initializeGameGrid(HTMLDocument document) {
        // Create the game container
        gameContainer = document.createElement("div").cast();
        gameContainer.getStyle().setProperty("width", (NUM_SQUARES * SQUARE_SIZE) + "px");
        gameContainer.getStyle().setProperty("height", (NUM_SQUARES * SQUARE_SIZE + TOP_BAR_WIDTH) + "px");
        gameContainer.getStyle().setProperty("border", "1px solid black");
        gameContainer.getStyle().setProperty("position", "relative");
        document.getBody().appendChild(gameContainer);

        // Create the scoreboard
        scoreBoard = document.createElement("div").cast();
        scoreBoard.getStyle().setProperty("width", "100%");
        scoreBoard.getStyle().setProperty("height", TOP_BAR_WIDTH + "px");
        scoreBoard.getStyle().setProperty("backgroundColor", "gray");
        scoreBoard.getStyle().setProperty("color", "white");
        scoreBoard.getStyle().setProperty("textAlign", "center");
        scoreBoard.setInnerHTML("Use W A S D to move");
        gameContainer.appendChild(scoreBoard);

        // Create the game grid
        gameBoard = document.createElement("div").cast();
        gameBoard.getStyle().setProperty("width", "100%");
        gameBoard.getStyle().setProperty("height", (NUM_SQUARES * SQUARE_SIZE) + "px");
        gameBoard.getStyle().setProperty("position", "relative");
        gameContainer.appendChild(gameBoard);

        squares = new HTMLDivElement[NUM_SQUARES][NUM_SQUARES];
        for (int row = 0; row < NUM_SQUARES; row++) {
            for (int col = 0; col < NUM_SQUARES; col++) {
                HTMLDivElement square = document.createElement("div").cast();
                square.getStyle().setProperty("width", SQUARE_SIZE + "px");
                square.getStyle().setProperty("height", SQUARE_SIZE + "px");
                square.getStyle().setProperty("position", "absolute");
                square.getStyle().setProperty("left", (col * SQUARE_SIZE) + "px");
                square.getStyle().setProperty("top", (row * SQUARE_SIZE) + "px");
                square.getStyle().setProperty("backgroundColor", ((row + col) % 2 == 0) ? "#00802b" : "#00b33c"); // Dark/Light green
                gameBoard.appendChild(square);
                squares[row][col] = square;
            }
        }

        // Add keyboard event listener
        document.addEventListener("keydown", evt -> handleKeyPress(((KeyboardEvent) evt).getKey()), false);

    }

    private void handleKeyPress(int keyCode) {
        switch (keyCode) {
            case 87: // W
                currentKey = 'w';
                break;
            case 65: // A
                currentKey = 'a';
                break;
            case 83: // S
                currentKey = 's';
                break;
            case 68: // D
                currentKey = 'd';
                break;
        }
        System.out.println("Key pressed: " + currentKey);
    }

    private void gameLoop() {
        start = System.currentTimeMillis();
        int bikeRow = 2, bikeCol = NUM_SQUARES / 2;
        boolean alive = true;

        while (alive) {
            if ((System.currentTimeMillis() - start) / GAME_REFRESH_RATE > 0) {
                // Update game state
                updateGameState(bikeRow, bikeCol);

                // Render game state
                renderGameState(bikeRow, bikeCol);
            }
        }

        // Game over
        scoreBoard.setInnerHTML("Game Over!");
    }

    private void updateGameState(int bikeRow, int bikeCol) {
        // Update bike position based on currentKey
        switch (currentKey) {
            case 'w':
                bikeCol--;
                break;
            case 'a':
                bikeRow--;
                break;
            case 's':
                bikeCol++;
                break;
            case 'd':
                bikeRow++;
                break;
        }

        // Check for collisions with walls
        if (bikeRow < 0 || bikeRow >= NUM_SQUARES || bikeCol < 0 || bikeCol >= NUM_SQUARES) {
            System.out.println("You hit the wall!");
        }
    }

    private void renderGameState(int bikeRow, int bikeCol) {
        // Update the grid to reflect the new bike position
        for (int row = 0; row < NUM_SQUARES; row++) {
            for (int col = 0; col < NUM_SQUARES; col++) {
                String color = ((row + col) % 2 == 0) ? "#00802b" : "#00b33c"; // Checkerboard colors
                squares[row][col].getStyle().setProperty("backgroundColor", color);
            }
        }

        // Set bike position
        squares[bikeRow][bikeCol].getStyle().setProperty("backgroundColor", "red");
    }
}
