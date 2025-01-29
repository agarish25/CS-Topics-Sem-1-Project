/* 
   Owen Wengreen
   1/22/2024
   
   Minesweeper, will function like the mine sweeper game.
   The goal is to find the location of all the mines without setting off any mines!
   each non-mine square will say how many mines are in a 3x3 grid around it.
   The user will enter the square they select by typing in the cordinates of the square.
   
   I used code from the PixLab project as a base for the image drawings.
*/

import java.awt.*;
import java.awt.font.*;
import java.awt.geom.*;
import java.awt.image.BufferedImage;
import java.text.*;
import java.util.*;
import java.util.List;
import java.util.Scanner;
import java.util.Arrays;
import java.awt.event.*;
import javax.swing.*;
import java.awt.MouseInfo;
import java.awt.Point;
import java.util.concurrent.TimeUnit;

public class MineSweeper extends SimplePicture implements MouseListener {
   
   private int currentX;
   private int currentY;
   
   @Override
   public void mouseClicked(MouseEvent e) {
      if (e.getX() != currentX) {
         currentX = e.getX();
         System.out.println("You pressed " + currentX);
      }
      
      int buttonPressed = e.getButton();
      
      System.out.print(buttonPressed);
//        int x=e.getX();
//        int y=e.getY();
//        currentX = x;
//        currentY = y;
       // System.out.println(x+","+y);//these co-ords are relative to the component
   }
   
    public void mousePressed(MouseEvent e){}
    public void mouseEntered(MouseEvent e){}
    public void mouseExited(MouseEvent e){}
    public void mouseReleased(MouseEvent e){}
                
   // gridSetter() puts mines in random locations
   public static int[][] gridSetter(int width, int height, int[][] grid) {
      int flagCount = (int) (width * height * 0.15) + 1;
      
      while (flagCount > 0) {
         int row = (int) (Math.random() * height);
         int col = (int) (Math.random() * width);
         if (grid[row][col] != -1) {
            grid[row][col] = -1;
            flagCount--;
         }
      }
      return grid;
   }
   
   // isValid() checks if the given box is within the given 2d array
   public static boolean isValid(int[][] grid, int row, int col) {
      if (row < 0) {
         return false; 
      }
      else if (row > grid.length - 1) {
         return false; 
      }
      if (col < 0) {
         return false; 
      }
      else if (col > grid[row].length - 1) {
         return false; 
      }
      return true;
   }
   
   // areaCalc() determines what number each square should have
   // based on how many mines are adjacent to it
   public static int[][] areaCalc(int[][] grid) {
      for (int row = 0; row < grid.length; row++) {
         for (int col = 0; col < grid[row].length; col++) {
               int counter = 0;
            if (grid[row][col] != -1) {
               for (int i = row - 1; i <= row + 1; i++) {
                  for (int j = col - 1; j <= col + 1; j++) {
                     if (isValid(grid, i, j)) {
                        if (grid[i][j] == -1) {
                           counter++;
                        }
                     }
                  }
               } 
               grid[row][col] = counter;
            }
         }
      }
      return grid;
   }
   
   // displayGrid() outputs the 2d area to consol for testing
   // a -1 is a mine
   // a 9 is a hidden square
   // a 10 is a reveiled empty square
   // a 11 is a flagged square
   // numbers 0-8 are the amount of mines in adjsient squares
   public static void displayGrid(int[][] grid) {
      for (int[] row : grid) {
         for (int value : row) {
            System.out.print(value + " ");
         }
         System.out.println();
      }
   }
   
   // show() is the algroithm to reveil a selected box
   // if the reveiling shows a 0 it reveils the area around the 0
   public static int[][] show(int[][] grid, int[][] game, int row, int col) {
      // converts the rows and cols to start counting from 0
      row--;
      col--;
      // these arrays store the locations of the 0's for checking next time through the while loop
      int[] rowsWithZero = new int[grid.length * grid[0].length];
      int[] colsWithZero = new int[grid.length * grid[0].length];
      // counter will keep track of where to log the 0's it has found
      int counter = 0;
      // amountOfZeros will keep track of how many times the outest loop will need to run
      int amountOfZeros = 1;
      // makes sure it is a good cord
      if (!isValid(game, row, col) || (game[row][col] != 9 && game[row][col] != 11)) {
         System.out.println("Please type in a new coordinate");
         return game;
      }
      int amountOfZerosChecked = 0;
      // the loop contiues as long as it has squares to look around
      while (amountOfZeros > 0) {
         if (grid[row][col] == 0) {
            for (int i = row - 1; i <= row + 1; i++) { 
               for (int j = col - 1; j <= col + 1; j++) {
                  // checks if the square is valid and hasn't been already reveiled
                  if (isValid(game, i, j) && game[i][j] != 10) {
                     // reveils the square
                     game[i][j] = grid[i][j];
                     if (grid[i][j] == 0) {
                        // marks the 0's locations
                        game[i][j] = grid[i][j] + 10;
                        rowsWithZero[counter] = i;
                        colsWithZero[counter] = j;
                        counter++;
                        // adds another time needed to go through the while loop
                        amountOfZeros++;
                     }
                  }
               }
            }
         }
         else {
            // if the square isn't 0,  it can just show it
            game[row][col] = grid[row][col];
         }
         // if it didn't find any 0's it will end the loop
         amountOfZeros--;
         // updates the square needed to be searched
         row = rowsWithZero[amountOfZerosChecked];
         col = colsWithZero[amountOfZerosChecked];
         amountOfZerosChecked++;
      }
      return game;
   }
   
   // fillShown() fills in the give box with the given color
   public void fillShown(int x, int y, String color) {
      Pixel[][] pixels = this.getPixels2D();
      // sets each pixel in the square to the given color
      for (int row = y + 1; row < y + 27; row++) {
         for (int col = x + 1; col < x + 27; col++) {
            if (color.equals("tan")) {
               pixels[row][col].setRed(237);
               pixels[row][col].setGreen(235);
               pixels[row][col].setBlue(183);
            }
            else if (color.equals("red")) {
               pixels[row][col].setRed(102);
               pixels[row][col].setGreen(0);
               pixels[row][col].setBlue(0);
            }
            else {
               pixels[row][col].setRed(6);
               pixels[row][col].setGreen(175);
               pixels[row][col].setBlue(194);
            }
         }
      }
   }
   
   ///////////////////////////// CODE FROM PIXLAB //////////////////////////
   public MineSweeper () {
      /* not needed but use it to show students the implicit call to super()
       * child constructors always call a parent constructor
       */
      super();
   }

   /**
    * Constructor that takes a file name and creates the picture
    * @param fileName the name of the file to create the picture from
    */
   public MineSweeper(String fileName) {
      // let the superclass handle this fileName
      super(fileName);
   }

   /**
    * Constructor that takes the height and width
    * @param height the height of the desired picture
    * @param width the width of the desired picture
    */
   public MineSweeper(int height, int width) {
      // let the superclass handle this width and height
      super(width,height);
      
   }

   /**
    * Constructor that takes a picture and creates a
    * copy of that picture
    * @param copyMineSweeper the picture to copy
    */
   public MineSweeper(Picture copyMineSweeper) {
      // let the superclass do the copy
      super(copyMineSweeper);
   }

   /**
    * Constructor that takes a buffered image
    * @param image the buffered image to use
    */
   public MineSweeper(BufferedImage image) {
      super(image);
   }
   ////////////////////// methods ///////////////////////////////////////

   /**
    * Method to return a string with information about this picture.
    * @return a string with information about the picture such as fileName,
    * height and width.
    */
   public String toString() {
      String output = "MineSweeper: filename " + getFileName() +
         ", height " + getHeight()
         + ", width " + getWidth();
      return output;
   
   }
   
   /////////////////// END OF CODE FROM PIXLAB //////////////////////////
   
   // used for the 7-segment display
   public void vertLine(int x, int y) {
      Pixel[][] pixels = this.getPixels2D();
      for (int row = x; row < x + 8; row++) {
         for (int col = y; col < y + 2; col++) {
            pixels[row][col].setRed(0);
            pixels[row][col].setGreen(0);
            pixels[row][col].setBlue(0);
         }
      }
   }
   
   // used for the 7-segment display
   public void horiLine(int x, int y) {
      Pixel[][] pixels = this.getPixels2D();
      for (int row = x; row < x + 2; row++) {
         for (int col = y; col < y + 8; col++) {
            pixels[row][col].setRed(0);
            pixels[row][col].setGreen(0);
            pixels[row][col].setBlue(0);
         }
      }
   }
   
   // drawNum() draws the number in the 7-segement display style
   // it draws the given number at the given cord
   public void drawNum(int x, int y, int num) {
      if (num == 0) {
         horiLine(x + 3, y + 10);
         vertLine(x + 5, y + 8);
         vertLine(x + 15, y + 8);
         vertLine(x + 5, y + 18);
         vertLine(x + 15, y + 18);
         horiLine(x + 23, y + 10);
      }
      else if (num == 1) {
         vertLine(x + 5, y + 18);
         vertLine(x + 15, y + 18);
      }
      else if (num == 2) {
         horiLine(x + 3, y + 10);
         vertLine(x + 15, y + 8);
         horiLine(x + 13, y + 10);
         vertLine(x + 5, y + 18);
         horiLine(x + 23, y + 10);
      }
      else if (num == 3) {
         horiLine(x + 3, y + 10);
         vertLine(x + 15, y + 18);
         vertLine(x + 5, y + 18);
         horiLine(x + 13, y + 10);
         horiLine(x + 23, y + 10);
      }
      else if (num == 4) {
         vertLine(x + 5, y + 8);
         vertLine(x + 5, y + 18);
         horiLine(x + 13, y + 10);
         vertLine(x + 15, y + 18);
      }
      else if (num == 5) {
         horiLine(x + 3, y + 10);
         vertLine(x + 5, y + 8);
         horiLine(x + 13, y + 10);
         vertLine(x + 15, y + 18);
         horiLine(x + 23, y + 10);
      }
      else if (num == 6) {
         horiLine(x + 3, y + 10);
         vertLine(x + 5, y + 8);
         horiLine(x + 13, y + 10);
         vertLine(x + 15, y + 8);
         vertLine(x + 15, y + 18);
         horiLine(x + 23, y + 10);
      }
      else if (num == 7) {
         horiLine(x + 3, y + 10);
         vertLine(x + 5, y + 18);
         vertLine(x + 15, y + 18);
      }
      else if (num == 8) {
         horiLine(x + 3, y + 10);
         vertLine(x + 5, y + 8);
         vertLine(x + 15, y + 8);
         horiLine(x + 13, y + 10);
         vertLine(x + 5, y + 18);
         vertLine(x + 15, y + 18);
         horiLine(x + 23, y + 10);
      }
      else if (num == 9) {
         horiLine(x + 3, y + 10);
         vertLine(x + 5, y + 8);
         vertLine(x + 5, y + 18);
         horiLine(x + 13, y + 10);
         vertLine(x + 15, y + 18);
         horiLine(x + 23, y + 10);
      }
   }
   
   // drawBoard() draws the board with the numbers on the side and the checkerboard grid
   public void drawBoard(int totalRows, int totalCols) {
      Pixel[][] pixels = this.getPixels2D();
      for (int row = 56; row < 28 * totalRows + 56; row += 28) {
         // numbers on side
         int trueRow = ((row - 56) / 28) + 1;
         int trueTensPlaceRow = trueRow / 10;
         int trueOnesPlaceRow = trueRow % 10;
         drawNum(row, 0, trueTensPlaceRow);
         drawNum(row, 28, trueOnesPlaceRow);
         
         for (int col = 56; col < 28 * totalCols + 56; col += 28) {
            // nums on top
            int trueCol = ((col - 56) / 28) + 1;
            int trueTensPlaceCol = trueCol / 10;
            int trueOnesPlaceCol = trueCol % 10;
            drawNum(0, col, trueTensPlaceCol);
            drawNum(28, col, trueOnesPlaceCol);
            
            // checker board pattern and boxs outline
            for (int boxRow = row; boxRow < row + 28; boxRow++) {
               for (int boxCol = col; boxCol < col + 28; boxCol++) {
                  // if the row and column indexes share the same sign make it the light green
                  if (((row - 56) / 28 % 2 == 0 && (col - 56) / 28 % 2 == 0) || ((row - 56) / 28 % 2 == 1 && (col - 56) / 28 % 2 == 1)) {
                     // if it is on the boarder of the box make it gray
                     if ((boxRow == row || boxRow == row + 27) || (boxCol == col || boxCol == col + 27)) {
                        pixels[boxRow][boxCol].setRed(200);
                        pixels[boxRow][boxCol].setGreen(200);
                        pixels[boxRow][boxCol].setBlue(200);
                     }
                     else {
                        pixels[boxRow][boxCol].setRed(0);
                        pixels[boxRow][boxCol].setGreen(153);
                        pixels[boxRow][boxCol].setBlue(0);
                     }
                  }
                  // if the row and column indexes have a sign make it the dark green
                  else {
                     // if it is on the board of the square make it dark gray
                     if ((boxRow == row || boxRow == row + 27) || (boxCol == col || boxCol == col + 27)) {
                        pixels[boxRow][boxCol].setRed(245);
                        pixels[boxRow][boxCol].setGreen(245);
                        pixels[boxRow][boxCol].setBlue(245);
                     }
                     else {
                        pixels[boxRow][boxCol].setRed(0);
                        pixels[boxRow][boxCol].setGreen(204);
                        pixels[boxRow][boxCol].setBlue(0);
                     }
                  }
               }
            }
         }
      }
   }
   
   // update() sets the game graphic to the most upto date version
   public void update(int[][] game) {
      Pixel[][] pixels = this.getPixels2D();
      for (int row = 0; row < game.length; row++) {
         for (int col = 0; col < game[row].length; col++) {
            if (game[row][col] == 11) {
               fillShown(col * 28 + 56, row * 28 + 56, "blue");
            }
            else if (game[row][col] == -1) {
               fillShown(col * 28 + 56, row * 28 + 56, "red");
            }
            else if (game[row][col] != 9) {
               fillShown(col * 28 + 56, row * 28 + 56, "tan");
               drawNum(row * 28 + 56, col * 28 + 56, game[row][col]);
            }
         }
      }
   }
   
   public static void main(String[] args) {
      // gets the disired board size from user
      Scanner scan = new Scanner(System.in);
      System.out.print("Please enter the width of board you wish to play with: ");
      int width = scan.nextInt();
      System.out.print("Now please enter the height of board you wish to play with: ");
      int height = scan.nextInt();
      
      // creates the boards with the correct size
      int[][] grid = new int[height][width];
      int[][] game = new int[height][width];
      
      // fills the game board with 9's which are considiered hidden tiles
      for (int[] row : game) {
         Arrays.fill(row, 9);
      }
      
      // sets up the board
      MineSweeper board = new MineSweeper(28 * height + 56, 28 * width + 56);
      // board = new JFrame();
      board.setTitle("Game Board");
      board.drawBoard(height, width);
      // board.addMouseListener(board);
      board.show();
      board.update(game);
      board.repaint();
      grid = gridSetter(width, height, grid);
      grid = areaCalc(grid);
      
      // displayGrid for testing
      // displayGrid(grid);
      
      // the logic to start the game with part of the board visible
      // it finds the 0 closest to the middle and reveals the area
      boolean searching = true;
      
      // sets its search start to the middle
      int row = height / 2;
      int col = width / 2;
      
      // sets up how far it should go around
      int rowIncrement = 1;
      int colIncrement = 1;
      
      // sets up the make distance it should go
      int rowIncremented = row + rowIncrement;
      int colIncremented = col + colIncrement;
      while (searching) {
         rowIncremented = row + rowIncrement;
         // cycles through the rows
         while (row != rowIncremented && searching) {
            if (isValid(grid, row, col) && grid[row][col] == 0) {
               searching = false;
               game = show(grid, game, row + 1, col + 1);
            }
            else {
               row++;
               if (rowIncrement > 0) {
                  rowIncrement++;
               }
               else {
                  rowIncrement--;
               }
               rowIncrement *= -1;
            }
         }
         // cycles through the columns
         colIncremented = col + colIncrement;
         while (col != colIncremented && searching) {
            if (isValid(grid, row, col) && grid[row][col] == 0) {

               searching = false;
               game = show(grid, game, row + 1, col + 1);
            }
            else {
               col++;
               if (colIncrement > 0) {
                  colIncrement++;
               }
               else {
                  colIncrement--;
               }
               colIncrement *= -1;
            }
         }
      }
      // updates board with the broken area
      board.update(game);
      board.repaint();
      
      // getting user input to start the game
      Scanner gameScan = new Scanner(System.in);
      System.out.println("Please enter a coordinate in the format d 2 7: ");
      System.out.println("Use d for dig, and f for flag to make the mines locations");
      
      
      
      boolean gameRunning = true;
      
      Point mouseLocation = MouseInfo.getPointerInfo().getLocation();
      
      int x = mouseLocation.x;
      int y = mouseLocation.y;
      int i = 0;
      
      while (i < 50) {
         mouseLocation = MouseInfo.getPointerInfo().getLocation();

         int newX = mouseLocation.x;
         int newY = mouseLocation.y;
         // System.out.println(newX);
         // System.out.println("Mouse X: " + x + ", Y: " + y);
         if (newX != x) {
            i++;
            System.out.println(newX);
         } 
         try {
           Thread.sleep(1000);
         } catch (InterruptedException e) {
           Thread.currentThread().interrupt();
         }
      }
      
      int correctFlags = 0;
      // logic for when the game is running
      while (gameRunning) {
         // gets the users desired input
         String input = gameScan.nextLine();
         String[] brokenApart = input.split(" ");
         
         // converts input rows and cols to individual ints
         int inputRow = Integer.parseInt(brokenApart[1]);
         int inputCol = Integer.parseInt(brokenApart[2]);
        
         // makes sure the user gave a valid coordinate
         if (!isValid(game, inputRow - 1, inputCol - 1)) {
            System.out.println("Please type in a new coordinate");
         }
         
         
         // checks for if the user is digging or flagging
         else if (brokenApart[0].equals("d")) {
            game = show(grid, game, inputRow, inputCol);
            // checks if the user hit a mine
            if (game[inputRow - 1][inputCol - 1] == -1) {
               gameRunning = false;
               System.out.println("You Lose!");
            }
         }
         
         
         else {
            // checks if it was a correct flag
            if (grid[inputRow - 1][inputCol - 1] == -1 && game[inputRow - 1][inputCol - 1] != 11) {
               correctFlags++;
            }
            // marks the flagged cord
            game[inputRow - 1][inputCol - 1] = 11;
         }
         // checks if all the flags are marked
         if (correctFlags == (int) (width * height * 0.15) + 1) {
            gameRunning = false;
            System.out.println("You Win!");
         }
         // updates board
         board.update(game);
         board.repaint();
      }
      // closes scanner
      scan.close();
   }
}
