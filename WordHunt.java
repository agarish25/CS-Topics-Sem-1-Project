/*
   Owen Wengreen
   12/4/2024
   
   WordHunt is a class for the game Word hunt. It is inspired by game pigions word hunt game.
   It works by draging the mouse around the screen.
*/

// import statements for the code to work
import javax.swing.*;
import java.awt.*;
import java.awt.image.*;
import java.awt.event.*;
import java.util.*;
import java.io.*;
import java.awt.geom.AffineTransform;

public class WordHunt extends JFrame implements MouseListener {
   // private instance variables needed for the code
   private int currentX;
   private int currentY;
   private JFrame board;
   private boolean mouseDown;
   private String[][] letterGrid;
   private String[] vowels = {"A", "E", "I", "O", "S"};
   private String[] consonants = {"B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "T", "U", "W"};
   private final int spacing = 107;
   private final int firstX = 125;
   private final int firstY = 325;
   private int offsetX;
   private int offsetY;
   private int score;
   private final Color gray = new Color(72, 72, 72);
   private final Color lightGray = new Color(214, 214, 214);
   private double rotationAngle;
   
   // WordHunt() is  the constructor to make the board
   public WordHunt() {
      board = new JFrame();
      
      // setting up the JFrame window
      board.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      board.setLayout(null);
      board.setSize(581, 800);
      
      board.setVisible(true);
      board.addMouseListener(this);

      letterGrid = new String[4][4];
      
      // creates the array of letters
      for (int i = 0; i < 16; i++) {
         int ranNum = (int) (Math.random() * 100) + 1;
         
         // adds more vowels then their should be to make the game easier
         if (ranNum < 38) {
            int ranVowel = (int) (Math.random() * vowels.length);
            letterGrid[i % 4][i / 4] = vowels[ranVowel];
         }
         else {
            int ranCon = (int) (Math.random() * consonants.length);
            letterGrid[i % 4][i / 4] = consonants[ranCon];
         }
      }
   }
   
   // mouseClick() finds where the mouse is clicked on the screen
   @Override
   public void mouseClicked(MouseEvent e) {
      if (mouseDown) {
         currentX = e.getX();
         currentY = e.getY();
         System.out.println("You pressed X: " + currentX + " Y: " + currentY);
      }
      
      int buttonPressed = e.getButton();
      System.out.print(buttonPressed);
   }
   
   // mousePressed() finds where the mouse was first pressed to get the offset for the mouse location
   public void mousePressed(MouseEvent e){
      mouseDown = true;
      currentX = e.getX();
      currentY = e.getY();
     
      Point mouseLocation = MouseInfo.getPointerInfo().getLocation();
      
      // finding the offset
      offsetX = mouseLocation.x - currentX;
      offsetY = mouseLocation.y - currentY;
      
      System.out.println(offsetX + " Y: " + offsetY);
   }
   
   // other mouse methods that are needed for the code
   public void mouseEntered(MouseEvent e){}
   public void mouseExited(MouseEvent e){}
   public void mouseReleased(MouseEvent e){
        mouseDown = false;
   }
 
   // Method to clear components from a specific layer in JLayeredPane
   public static void clearLayer(JLayeredPane layeredPane, int layer) {
      // Get all components in the JLayeredPane
      Component[] components = layeredPane.getComponentsInLayer(layer);
        
      // Remove each component from the layer
      for (Component comp : components) {
         layeredPane.remove(comp);
      }
      
      // repaints the panel once it is cleared
      layeredPane.revalidate();
      layeredPane.repaint();
   }
   
   // main() method
   public static void main(String[] args) throws FileNotFoundException {
      // creates a new board
      WordHunt game = new WordHunt();
      
      game.score = 0;
      
      // converts the word list file to a Set
      File wordList = new File("fullWordList.txt");
      Scanner words = new Scanner(wordList);
      
      Set<String> allWords = new TreeSet<>();
      
      while (words.hasNext()) {
         String word = words.next();
         allWords.add(word);
      }
      
      // draws the panel of the game
      JPanel panel = new JPanel() { 
         @Override
         // drawing the board and adding the letters
         public void paintComponent(Graphics g) {
            super.paintComponent(g); 
            
            // Draw the background image manually
            ImageIcon icon = new ImageIcon("blankBoard.png");
            g.drawImage(icon.getImage(), 0, 0, this);
             
             // Set font for the letters
            g.setFont(new Font("Arial", Font.BOLD, 55)); // Font and size for the letters
            g.setColor(Color.BLACK); // Set the color of the letters
            FontMetrics metrics = g.getFontMetrics();
            
            // putting the letters on the board in the correct locations
            for (int row = 0; row < 4; row++) {
               for (int col = 0; col < 4; col++) {
                  int x = col * game.spacing + game.firstX - game.spacing / 2 + (game.spacing - metrics.stringWidth(game.letterGrid[row][col])) / 2;;
                  int y = row * game.spacing + game.firstY - game.spacing / 2 + ((game.spacing - metrics.getHeight()) / 2) + metrics.getAscent();
                  
                  g.drawString(game.letterGrid[row][col], x, y);
               }
            }
         }
      };
      
      // adds the panel to the frame
      panel.setBounds(0, 0, 581, 800);
      game.board.add(panel);
      
      // creates a panel for the scoreboard
      JPanel scoreBoard = new JPanel();
      scoreBoard.setBounds(165, 10, 230, 110);
      
      // creates labels for the score and for the current word
      JLabel scoreBoardText = new JLabel("Click To Start");
      JLabel wordWritten = new JLabel("");
      
      // setting the information about the textbox
      scoreBoardText.setFont(new Font("Comic Sans MS", Font.BOLD, 22));
      wordWritten.setFont(new Font("Comic Sans MS", Font.BOLD, 25));
      
      scoreBoard.setBorder(BorderFactory.createEmptyBorder(3, 10, 3, 10));
      scoreBoardText.setForeground(game.gray);
      wordWritten.setForeground(game.gray);
      scoreBoard.setLayout(null);
      
      // adding the text box to the box and putting it in the middle
      scoreBoard.add(scoreBoardText);
      scoreBoardText.setBounds(35, 75, 230, 30);
      scoreBoard.setVisible(true);
      
      // adds the label to the panel and sets the information up
      wordWritten.setBounds(30, 25, 230, 30);
      scoreBoard.add(wordWritten);
      JLayeredPane layeredPane = new JLayeredPane();
      layeredPane.setBounds(0, 0, 581, 800);
      
      // Add the game panel and scoreboard to the layered pane
      layeredPane.add(panel, JLayeredPane.DEFAULT_LAYER);  // Scoreboard at default layer (background)
      layeredPane.add(scoreBoard, JLayeredPane.PALETTE_LAYER);  // Game grid at a higher layer (foreground)
      
      // Add the layered pane to the main window (frame or container)
      game.board.add(layeredPane);
      game.board.setVisible(true);
      
      // creates a set for the words inputted so far
      boolean gameStillGoing = true;
      Set<String> wordsSoFar = new HashSet<>();
      
      // creates variables for the previous words and sets it to an impossible number
      int previousX = -1;
      int previousY = -1;
            
      // a while loop for the game to run in  
      while (gameStillGoing) {
         String currentWord = "";
         Set<Integer> alreadyDone = new TreeSet<>();
          
         // allows the mouse to be lifted for couple ticks because the mouse bugs sometimes
         int mouseLiftedUpInARow = 0;
         
         // onWord keeps going until it is a new word
         boolean onWord = true;
         while (onWord) {
            
            // gets the mouse location relative to where it was fist clicked
            Point mouseLocation = MouseInfo.getPointerInfo().getLocation();
             
            int locX = mouseLocation.x - game.offsetX;
            int locY = mouseLocation.y - game.offsetY;
            
            // if the mouse is down, it checks if it is near a letter
            if (game.mouseDown) {
               int probablyCloseX = (locX - game.firstX + game.spacing / 2) / game.spacing;
               int probablyCloseY = (locY - game.firstY + game.spacing / 2) / (game.spacing + 10);                      
               
               // calculates how close it is to the nearest letter
               double distanceToEst = Math.pow((Math.pow(((game.firstX + probablyCloseX * game.spacing) - locX + 10), 2) + Math.pow(((game.firstY + probablyCloseY * game.spacing) - locY + 35), 2)), 0.5);     
               
               // if it is less than 30 pixels to the nearest letter is counts it as that letter and checks if the letter is already done
               if (distanceToEst < 30 && !alreadyDone.contains((probablyCloseY + 1) * 4 + probablyCloseX + 1) && probablyCloseX < 4 && probablyCloseX >= 0 && probablyCloseY < 4 && probablyCloseY >= 0) {
                  currentWord = currentWord + game.letterGrid[probablyCloseY][probablyCloseX];
                  alreadyDone.add((probablyCloseY + 1) * 4 + probablyCloseX + 1);
                  System.out.println(currentWord);
                  
                  // updates the board at the top with the current progress of the word
                  wordWritten.setText("Word: " + currentWord);
                  
                  // creates a final variable for the location of the line to start in
                  final int previousXfix = previousX;
                  final int previousYfix = previousY;
                  
                  // draws a line between the letters
                  JPanel line = new JPanel() { 
                     @Override
                     public void paintComponent(Graphics g) {
                        super.paintComponent(g);
                          
                        // Cast the Graphics object to Graphics2D
                        Graphics2D g2d = (Graphics2D) g;
                         
                        g2d.setColor(new Color(38, 38, 38, 200));
                        g2d.setStroke(new BasicStroke(10));
                        g2d.drawLine(game.firstX + previousXfix * game.spacing, game.firstY + (previousYfix - 2) * game.spacing, game.firstX + probablyCloseX * game.spacing, game.firstY + (probablyCloseY - 2) * game.spacing);
                     }
                  };
                  
                  // sets up the line stuff
                  line.setOpaque(false);
                  line.setBackground(null);
                  
                  line.setBounds(0, 200, 581, 800);
                  
                  // Set preferred size to ensure panel has enough space to draw
                  line.setPreferredSize(new Dimension(400, 400));
                  // makes it so a line isn't draw on the first letter and adds it to the top layer
                  if (previousXfix != -1) {
                     layeredPane.add(line, JLayeredPane.POPUP_LAYER);
                  }
                  previousX = probablyCloseX;
                  previousY = probablyCloseY;
              }    
              mouseLiftedUpInARow = 0;
            }
            // gives some tolerance to the mouse
            else if (mouseLiftedUpInARow < 50) {
               mouseLiftedUpInARow++;
            }
            // checks if the word has already been done
            else if (wordsSoFar.contains(currentWord)) {
               System.out.println(currentWord + " you have already done this -- probably!");
               wordWritten.setText("Word: ");
               // makes it so starts finding a new word
               onWord = false;
               // clears the panel and resets the variables
               System.out.println("CLEARING");
               clearLayer(layeredPane, JLayeredPane.POPUP_LAYER); 
               previousX = -1;
               previousY = -1;
            }
            // checks if the word is long enough and assigns points
            else if (currentWord.length() > 0) {         
               if (allWords.contains(currentWord.toLowerCase()) && currentWord.length() > 2 && !wordsSoFar.contains(currentWord)) {
                  if (currentWord.length() == 3) {
                     game.score += 100;
                  }
                  else if (currentWord.length() == 4) {
                     game.score += 300;
                  }
                  else if (currentWord.length() == 5) {
                     game.score += 800;
                  }
                  else if (currentWord.length() == 6) {
                     game.score += 1200;
                  }
                  else {
                     game.score += 2000;
                  }
                  System.out.println("YOUR SCORE " + game.score); 
                  scoreBoardText.setText("Score: " + game.score);
                  
                  // adds the word to the words already done
                  wordsSoFar.add(currentWord);
               }
               // otherwise it isn't a word in the data base
               else {
                  System.out.println(currentWord + " is not a word i think");
               }
               
               // resets the variables for the next word
               currentWord = "";
               alreadyDone.clear();
               wordWritten.setText("Word: ");
               onWord = false;
               System.out.println("CLEARING");
               clearLayer(layeredPane, JLayeredPane.POPUP_LAYER); 
               previousX = -1;
               previousY = -1;
            }   
         }
      }  
   }
}