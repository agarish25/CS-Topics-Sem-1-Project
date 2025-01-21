/*
Owen Wengreen
12/4/2024

WordHunt is a class for the game Word hunt. It is inspired by game pigions word hunt game.
It works by draging the mouse around the screen.
*/


import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.MouseInfo;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.geom.AffineTransform;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.TreeSet;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JPanel;

public class WordHunt extends JFrame implements MouseListener {
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

@Override
public void mouseClicked(MouseEvent e) {
// System.out.println(mouseDown);
if (mouseDown) {
currentX = e.getX();
currentY = e.getY();
System.out.println("You pressed X: " + currentX + " Y: " + currentY);
}

int buttonPressed = e.getButton();

System.out.print(buttonPressed);
}

public void mousePressed(MouseEvent e){
mouseDown = true;
currentX = e.getX();
currentY = e.getY();

Point mouseLocation = MouseInfo.getPointerInfo().getLocation();

offsetX = mouseLocation.x - currentX;
offsetY = mouseLocation.y - currentY;

System.out.println(offsetX + " Y: " + offsetY);
}

public void mouseEntered(MouseEvent e){}
public void mouseExited(MouseEvent e){}
public void mouseReleased(MouseEvent e){
mouseDown = false;
}


public WordHunt() {
board = new JFrame();

// setting up the JFrame window
board.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
board.setLayout(null);
board.setSize(581, 800);

board.setVisible(true);
board.addMouseListener(this);

letterGrid = new String[4][4];

for (int i = 0; i < 16; i++) {
int ranNum = (int) (Math.random() * 100) + 1;

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

// Method to clear components from a specific layer in JLayeredPane
public static void clearLayer(JLayeredPane layeredPane, int layer) {
// Get all components in the JLayeredPane
Component[] components = layeredPane.getComponentsInLayer(layer);

// Remove each component from the layer
for (Component comp : components) {
layeredPane.remove(comp);
}

// Revalidate and repaint the pane to reflect changes
layeredPane.revalidate();
layeredPane.repaint();
}

public JPanel drawRotatedRect(int angle, int x, int y) {
JPanel line = new JPanel() {
@Override
protected void paintComponent(Graphics g) {
super.paintComponent(g);

// Cast the Graphics object to Graphics2D
Graphics2D g2d = (Graphics2D) g;

// Set rendering hints for better quality
g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

// Set the rotation angle in radians (e.g., 45 degrees)
double angle = Math.toRadians(45);

// Get the center of the panel (for rotation)
int centerX = getWidth() / 2;
int centerY = getHeight() / 2;

// Apply rotation around the center of the panel
AffineTransform originalTransform = g2d.getTransform(); // Save the original transform
g2d.rotate(angle, getWidth(), centerY);

// Draw a rectangle at a rotated angle
int rectWidth = 100;
int rectHeight = 500;
g2d.setColor(Color.BLUE);
g2d.fillRect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight);

g2d.fillRect(100, 100, 100, 100);
// Restore the original transform
g2d.setTransform(originalTransform);
}
};

board.add(line);
return line;
}
//
// public static int locationToCordX(int x) {
// return firstX + x * spacing;
// }
//
// public static int locationToCordY(int y) {
// return firstY + y * spacing;
// }

public static void main(String[] args) throws FileNotFoundException {
WordHunt game = new WordHunt();

game.score = 0;

File wordList = new File("fullWordList.txt");
Scanner words = new Scanner(wordList);

Set<String> allWords = new TreeSet<>();

while (words.hasNext()) {
String word = words.next();
allWords.add(word);
}

System.out.println(allWords);

JPanel panel = new JPanel() {
@Override
public void paintComponent(Graphics g) {
super.paintComponent(g);

// Draw the background image manually
ImageIcon icon = new ImageIcon("blankBoard.png");
g.drawImage(icon.getImage(), 0, 0, this);

// Set font for the letters
g.setFont(new Font("Arial", Font.BOLD, 55)); // Font and size for the letters
g.setColor(Color.BLACK); // Set the color of the letters
FontMetrics metrics = g.getFontMetrics();

for (int row = 0; row < 4; row++) {
for (int col = 0; col < 4; col++) {
// System.out.print(game.letterGrid[row][col] + " ");

int x = col * game.spacing + game.firstX - game.spacing / 2 + (game.spacing - metrics.stringWidth(game.letterGrid[row][col])) / 2;;
int y = row * game.spacing + game.firstY - game.spacing / 2 + ((game.spacing - metrics.getHeight()) / 2) + metrics.getAscent();

g.drawString(game.letterGrid[row][col], x, y);

}
// System.out.println();
}
}
};

panel.setBounds(0, 0, 581, 800);
game.board.add(panel);

JPanel scoreBoard = new JPanel();
scoreBoard.setBounds(165, 10, 230, 110);

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
// scoreBoardText.setHorizontalAlignment(JLabel.CENTER);
// scoreBoardText.setVerticalAlignment(JLabel.BOTTOM);
scoreBoard.setVisible(true);

// wordWritten.setHorizontalAlignment(JLabel.CENTER);
// wordWritten.setVerticalAlignment(JLabel.TOP);
wordWritten.setBounds(30, 25, 230, 30);
scoreBoard.add(wordWritten);
JLayeredPane layeredPane = new JLayeredPane();
layeredPane.setBounds(0, 0, 581, 800); // Ensure the layered pane matches the game board size

// Add the game panel and scoreboard to the layered pane
layeredPane.add(panel, JLayeredPane.DEFAULT_LAYER); // Scoreboard at default layer (background)
layeredPane.add(scoreBoard, JLayeredPane.PALETTE_LAYER); // Game grid at a higher layer (foreground)
layeredPane.add(game.drawRotatedRect(45, 100, 200), JLayeredPane.PALETTE_LAYER);

// Add the layered pane to the main window (frame or container)
game.board.add(layeredPane);
game.board.setVisible(true);

boolean gameStillGoing = true;
Set<String> wordsSoFar = new HashSet<>();

int previousX = -1;
int previousY = -1;

while (gameStillGoing) {
String currentWord = "";
Set<Integer> alreadyDone = new TreeSet<>();

int mouseLiftedUpInARow = 0;

for (int i = 0; i < 1000000; i++) {

Point mouseLocation = MouseInfo.getPointerInfo().getLocation();

int locX = mouseLocation.x - game.offsetX;
int locY = mouseLocation.y - game.offsetY;

if (game.mouseDown) {
// System.out.println((locX - game.firstX));
int probablyCloseX = (locX - game.firstX + game.spacing / 2) / game.spacing;
int probablyCloseY = (locY - game.firstY + game.spacing / 2) / (game.spacing + 10);
// System.out.println("Your probably close to: " + probablyCloseX + " Y: " + probablyCloseY);

double distanceToEst = Math.pow((Math.pow(((game.firstX + probablyCloseX * game.spacing) - locX + 10), 2) + Math.pow(((game.firstY + probablyCloseY * game.spacing) - locY + 35), 2)), 0.5);
// System.out.println(distanceToEst);



if (distanceToEst < 30 && !alreadyDone.contains((probablyCloseY + 1) * 4 + probablyCloseX + 1) && probablyCloseX < 4 && probablyCloseX >= 0 && probablyCloseY < 4 && probablyCloseY >= 0) {
currentWord = currentWord + game.letterGrid[probablyCloseY][probablyCloseX];
alreadyDone.add((probablyCloseY + 1) * 4 + probablyCloseX + 1);
System.out.println(currentWord + " hiii");

wordWritten.setText("Word: " + currentWord);

final int previousXfix = previousX;
final int previousYfix = previousY;

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
line.setOpaque(false);
line.setBackground(null);

line.setBounds(0, 200, 581, 800);

// Set preferred size to ensure panel has enough space to draw
line.setPreferredSize(new Dimension(400, 400));
if (previousXfix != -1) {
layeredPane.add(line, JLayeredPane.POPUP_LAYER);
}
previousX = probablyCloseX;
previousY = probablyCloseY;
}
mouseLiftedUpInARow = 0;
}
else if (mouseLiftedUpInARow < 1000) {
mouseLiftedUpInARow++;
}
else if (wordsSoFar.contains(currentWord)) {
System.out.println(currentWord + " you have already done this probably!");
wordWritten.setText("Word: ");
System.out.println("CLEARINGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
clearLayer(layeredPane, JLayeredPane.POPUP_LAYER);
previousX = -1;
previousY = -1;
}

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

wordsSoFar.add(currentWord);
}
else {
System.out.println(currentWord + " is not a word i think");
}

currentWord = "";
alreadyDone.clear();
wordWritten.setText("Word: ");
System.out.println("CLEARINGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
clearLayer(layeredPane, JLayeredPane.POPUP_LAYER);
previousX = -1;
previousY = -1;
}
}
}
}
}