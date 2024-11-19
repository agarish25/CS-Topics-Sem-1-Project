/*
   Owen Wengreen
   11/10/2024
   
   BikeGame is a game inspired from the snake game. The goal of the game
   is to collect as many ducks as possible without running over your ducks
   or running into a wall!
   
   Controls:
   W - up
   A - left
   S - downKK
   D - right
*/

// imports to display the game and for the logic
import javax.swing.*;
import java.awt.*;
import java.awt.image.*;
import java.awt.event.*;
import java.util.ArrayList;

public class BikeGame extends JFrame implements KeyListener {

   // private instance varibles for the game
   private int[][] game;
   private JFrame board;
   private JPanel[][] squares;
   private long start;
   private char currentKey;
   
   // values that control how the game looks and plays
   private final Color darkGreen = new Color(0, 128, 43);
   private final Color lightGreen = new Color(0, 179, 60);
   private final Color gray = new Color(72, 72, 72);
   private final Color lightGray = new Color(214, 214, 214);
   private final int numSquares = 12;
   private final int squareSize = 40;
   private final int topBarWidth = 45;
   private final int duckIconSize = squareSize - 5;
   private final int gameRefreshRate = 250;
   
   // BikeGame() constructor to create the board and display it
   public BikeGame() {
      // recording the starting time
      start = System.currentTimeMillis();
      
      // setting up the JFrame window
      board = new JFrame();
      game = new int[numSquares][numSquares];
      squares = new JPanel[numSquares][numSquares];
      
      // setting every square to 0. 0 means it is empty
      for (int row = 0; row < game.length; row++) {
         for (int col = 0; col < game[row].length; col++) {
            game[row][col] = 0;
         }
      }
      
      // setting up the JFrame window
      board.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      board.setLayout(null);
      board.setSize(squareSize * numSquares + (squareSize / 3), squareSize * numSquares + (squareSize - 5) + topBarWidth);
      board.setVisible(true);
      board.addKeyListener(this);
   }
   
   // keyTyped() is a method to print out what key is typed
   @Override 
   public void keyTyped(KeyEvent e) {
      System.out.println("You typed " + e.getKeyChar());
   }
   
   // keyPressed() is a method to record what key is the most recent to be pressed
   @Override 
   public void keyPressed(KeyEvent e) {
      if (e.getKeyChar() != currentKey) {
         currentKey = e.getKeyChar();
         System.out.println("You pressed " + currentKey);
      }
   }
   
   // keyReleased() is a method to print out when a key is released
   @Override 
   public void keyReleased(KeyEvent e) {
      System.out.println("You released " + e.getKeyChar());
   }
   
   // makePanels() makes all the panels for the game and sets their background color in a checkerboard
   public void makePanels() {
      for (int row = 0; row < game.length; row++) {
         for (int col = 0; col < game[row].length; col++) {
            squares[row][col] = new JPanel();
            
            // checking whick color to set the background
            if (row % 2 == 0 && col % 2 == 0) {
               squares[row][col].setBackground(darkGreen);
            }
            else if (col % 2 == 1 && row % 2 == 1) {
               squares[row][col].setBackground(darkGreen);
            }
            else {
               squares[row][col].setBackground(lightGreen);
            }
            
            // setting the bounds for the new panel and adding it to the JFrame
            squares[row][col].setBounds(row * squareSize, col * squareSize + topBarWidth, squareSize, squareSize);
            board.add(squares[row][col]);
         }
      }
   }
   
   // main()
   public static void main(String[] args) {
      // creating a new game
      BikeGame gameBoard = new BikeGame();
      
      // creating an ArrayList of the ducks and their locations
      ArrayList<JLabel> ducks = new ArrayList<JLabel>();
      ArrayList<Integer> duckRows = new ArrayList<Integer>();
      ArrayList<Integer> duckCols = new ArrayList<Integer>();
      
      // creating a box at the top for the instructions and score
      JPanel scoreBoard = new JPanel();
      scoreBoard.setBackground(gameBoard.gray);
      scoreBoard.setBounds(0, 0, gameBoard.squareSize * gameBoard.numSquares, gameBoard.topBarWidth);
      
      JLabel scoreBoardText = new JLabel("Use W A S D to move");
      
      // setting the information about the textbox
      scoreBoardText.setFont(new Font("Helvetica", Font.PLAIN, 28));
      scoreBoard.add(scoreBoardText);
      scoreBoard.setBorder(BorderFactory.createEmptyBorder(3, 10, 3, 10));
      scoreBoardText.setForeground(gameBoard.lightGray);
      scoreBoard.setLayout(new GridLayout(0, 1));
      
      // adding the text box to the box and putting it in the middle
      gameBoard.board.add(scoreBoard);
      scoreBoardText.setHorizontalAlignment(JLabel.CENTER);
      scoreBoardText.setVerticalAlignment(JLabel.TOP);
      
      // creating the icons for the bike for all orientations and scaling them
      ImageIcon rightBike = new ImageIcon("bikeRight.png");
      rightBike.setImage(rightBike.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon leftBike = new ImageIcon("bikeLeft.png");
      leftBike.setImage(leftBike.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon upBike = new ImageIcon("bikeUp.png");
      upBike.setImage(upBike.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon downBike = new ImageIcon("bikeDown.png");
      downBike.setImage(downBike.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));

      // creating the icon for the muddy duck and scaling it
      ImageIcon mudDuck = new ImageIcon("duckMuddy.png");
      mudDuck.setImage(mudDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      
      // creating the icons for the follower ducks for all orientations and scaling them
      ImageIcon rightDuck = new ImageIcon("duckRight.png");
      rightDuck.setImage(rightDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon upRightDuck = new ImageIcon("duckUpRight.png");
      upRightDuck.setImage(upRightDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon upDuck = new ImageIcon("duckUp.png");
      upDuck.setImage(upDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon upLeftDuck = new ImageIcon("duckUpLeft.png");
      upLeftDuck.setImage(upLeftDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon leftDuck = new ImageIcon("duckLeft.png");
      leftDuck.setImage(leftDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon downLeftDuck = new ImageIcon("duckDownLeft.png");
      downLeftDuck.setImage(downLeftDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon downDuck = new ImageIcon("duckDown.png");
      downDuck.setImage(downDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      ImageIcon downRightDuck = new ImageIcon("duckDownRight.png");
      downRightDuck.setImage(downRightDuck.getImage().getScaledInstance(gameBoard.duckIconSize, gameBoard.duckIconSize, Image.SCALE_SMOOTH));
      
      // setting the goal ducks icon to be the muddy duck
      JLabel goalDuck = new JLabel();
      goalDuck.setIcon(mudDuck);
      
      // setting the bikes icon to be a right facing bike by default
      JLabel bike = new JLabel();
      bike.setIcon(rightBike);
      
      // setting the player to be alive by default
      boolean alive = true;
      
      // creating the panels
      gameBoard.makePanels();
      
      // variables that need to be stored during the game
      int currentTime = 0;
      int currentBikeRow = 2;
      int currentBikeCol = gameBoard.numSquares / 2;
      int oldBikeRow = 2;
      int oldBikeCol = 10;
      int score = 0;
      boolean started = false;
      String currentDirection = null;
      String newDirection = null;
      
      // starting the goal duck across from the bike
      int goalDuckRow = gameBoard.numSquares - 3;
      int goalDuckCol = gameBoard.numSquares / 2;
      
      gameBoard.game[goalDuckRow][goalDuckCol] = -1;
      gameBoard.squares[goalDuckRow][goalDuckCol].add(goalDuck);
      
      // a while loop that runs while the player is still alive
      while (alive) {
         // making it so everything only runs once every gameRefreshRate
         if ((System.currentTimeMillis() - gameBoard.start) / gameBoard.gameRefreshRate != currentTime) {
            boolean scored = false;
            
            char key = gameBoard.currentKey;
            
            // if the player presses a key other than WASD it just keeps doing what ever it was doing before
            if (started && (key != 's' && key != 'd' && key != 'a' && key != 'w')) {
               if (currentDirection.equals("up")) {
                  key = 'w';
               }
               else if (currentDirection.equals("left")) {
                  key = 'a';
               }
               else if (currentDirection.equals("right")) {
                  key = 'd';
               }
               else if (currentDirection.equals("down")) {
                  key = 's';
               }
            }
            
            // if the player tries to turn 180 they can't and will just keep going in the current direction
            if (currentDirection != null) {
               if (currentDirection.equals("up") && key == 's') {
                  key = 'w';
               }
               else if (currentDirection.equals("left") && key == 'd') {
                  key = 'a';
               }
               else if (currentDirection.equals("right") && key == 'a') {
                  key = 'd';
               }
               else if (currentDirection.equals("down") && key == 'w') {
                  key = 's';
               }
            }
            
            // saving the old bike location
            oldBikeRow = currentBikeRow;
            oldBikeCol = currentBikeCol;
            
            // updating the bikes location and changing the icon for its new direction
            if (key == 'w') {
               newDirection = "up";
               started = true;

               currentBikeCol--;
               bike.setIcon(upBike);
            }
            else if (key == 'a') {
               newDirection = "left";
               started = true;

               currentBikeRow--;
               bike.setIcon(leftBike);
            }
            else if (key == 'd') {
               newDirection = "right";
               started = true;

               currentBikeRow++;
               bike.setIcon(rightBike);
            }
            else if (key == 's') {
               newDirection = "down";
               started = true;

               currentBikeCol++;
               bike.setIcon(downBike);
            }
            
            // checking if the player hit a wall
            if (currentBikeRow < 0 || currentBikeRow > gameBoard.squares.length - 1 || currentBikeCol < 0
                                           || currentBikeCol > gameBoard.squares[0].length - 1) {
               alive = false;
               System.out.println("You died");
            }
            
            if (alive) {
               // moving the bike and redrawing the game
               gameBoard.squares[currentBikeRow][currentBikeCol].add(bike);
            
               gameBoard.board.repaint();
               
               // if the player is on a goal duck (which is -1) than it adds another duck to the chain
               // and moves the goal duck
               if (gameBoard.game[currentBikeRow][currentBikeCol] == -1) {
                  // increasing the score
                  score++;
                  
                  // making a new duck
                  JLabel newDuck = new JLabel();

                  duckRows.add(oldBikeRow);
                  duckCols.add(oldBikeCol);

                  ducks.add(newDuck);
                  
                  int oldGoalRow = goalDuckRow;
                  int oldGoalCol = goalDuckCol;
                  
                  // finding an open spot for the goal duck
                  while (gameBoard.game[goalDuckRow][goalDuckCol] != 0) {
                     goalDuckRow = (int) (Math.random() * gameBoard.game[0].length);
                     goalDuckCol = (int) (Math.random() * gameBoard.game.length);
                  }
                  
                  // setting the old square to empty and the new square to a goal duck
                  gameBoard.game[oldGoalRow][oldGoalCol] = 0;
                  gameBoard.game[goalDuckRow][goalDuckCol] = -1;
                  
                  // adding the goal duck to a panel
                  gameBoard.squares[goalDuckRow][goalDuckCol].add(goalDuck);
                  scored = true;
               }
            }          
            
            // if the player has found a duck, every time it moves it will shuffle
            // the last duck to be behind the bike
            if (ducks.size() > 0) {
               // removing the last duck
               JLabel newDucky = ducks.remove(0);
               gameBoard.game[duckRows.remove(0)][duckCols.remove(0)] = 0;
               
               // adding the last duck to be behind the bike
               gameBoard.squares[oldBikeRow][oldBikeCol].add(newDucky);
               
               // calculating which orientation to make the duck
               if (newDirection.equals("down")) {
                  if (currentDirection.equals("right")) {
                     newDucky.setIcon(downRightDuck);
                  }
                  else if (currentDirection.equals("left")) {
                     newDucky.setIcon(downLeftDuck);
                  }
                  else {
                     newDucky.setIcon(downDuck);
                  }
               }
               else if (newDirection.equals("up")) {
                  if (currentDirection.equals("right")) {
                     newDucky.setIcon(upRightDuck);
                  }
                  else if (currentDirection.equals("left")) {
                     newDucky.setIcon(upLeftDuck);
                  }
                  else {
                     newDucky.setIcon(upDuck);
                  }
               }
               else if (newDirection.equals("left")) {
                  if (currentDirection.equals("up")) {
                     newDucky.setIcon(upLeftDuck);
                  }
                  else if (currentDirection.equals("down")) {
                     newDucky.setIcon(downLeftDuck);
                  }
                  else {
                     newDucky.setIcon(leftDuck);
                  }
               }
               else if (newDirection.equals("right")) {
                  if (currentDirection.equals("up")) {
                     newDucky.setIcon(upRightDuck);
                  }
                  else if (currentDirection.equals("down")) {
                     newDucky.setIcon(downRightDuck);
                  }
                  else {
                     newDucky.setIcon(rightDuck);
                  }
               }
               
               // adding the duck to the end of the ArrayList
               ducks.add(ducks.size(), newDucky);
               System.out.println("Amount of ducks " + ducks.size());
               // adding the ducks location so it knows what duck is where
               duckRows.add(oldBikeRow);
               duckCols.add(oldBikeCol);
               
               // setting the ducks spot to have a duck in it
               gameBoard.game[oldBikeRow][oldBikeCol] = 1;
            }
            else {
               // making it so the squares behind the bike are considered empty if they have no ducks
               gameBoard.game[oldBikeRow][oldBikeCol] = 0;
            }
            
            // updating current direction
            currentDirection = newDirection;
            
            // updating the scoreboard
            if (started && alive) {
               scoreBoardText.setText("Number of ducks: " + score);
            }
            
            // updating the current time
            currentTime = (int) ((System.currentTimeMillis() - gameBoard.start) / gameBoard.gameRefreshRate);
            
            // checking if the bike has run over a duck
            if (alive) {
               if (!(gameBoard.game[currentBikeRow][currentBikeCol] == 0 || gameBoard.game[currentBikeRow][currentBikeCol] == 2) ) {
                  alive = false;
                  System.out.println("You died");
               }
               
               // updating the bikes square so it has a bike in it
               gameBoard.game[currentBikeRow][currentBikeCol] = 2;
            }
         }
      }
      
      // changing the board to say the score
      if (score > 1) {
         scoreBoardText.setText("Game Over. You got " + score + " ducks!");
      }
      else {
         scoreBoardText.setText("Game Over. You got " + score + " duck!");
      }
   }
}