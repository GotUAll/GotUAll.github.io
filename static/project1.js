//////////////////////////////////////////////////////////
// Invader Pong
// ECE 4525 - Project 1
// By: Aaron Yang
//////////////////////////////////////////////////////////
// Instructions
// Right Arrow to move right
// Left Arrow to move left
// Space to Shoot
// Shoot the invaders
// Avoid the bombs
// Keep the ball off the ground
// Ball can block bombs, but gets destroyed by bullets
//////////////////////////////////////////////////////////

// Game States
const gameStates = {
  LOGO: 0,
  PLAY: 1,
  GAMEOVER: 2,
};

// Global Variables
var gameState;
var keys = [];
var initials = [];
var circles = [];
var circlesIndex = 0;
var bgR = 0;
var bgG = 0;
var bgB = 0;

// Classes
// Circle class that expands
class expandCircle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.diameter = 0;
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  display() {
    stroke(this.red, this.green, this.blue);
    strokeWeight(5);
    noFill();
    circle(this.x, this.y, this.diameter);
  }

  update() {
    this.diameter += 5;
  }
}

// 0, 0 at upper left corner
// Parent class of all letters
class letter {
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;

    // Size
    this.height = 50;
    this.width = 50;
    this.weight = (this.height * this.width) / (5 * (this.height + this.width));
    this.increment = 5;

    // Color
    this.red = 255;
    this.green = 255;
    this.blue = 255;

    // Movement
    this.xDir = random(1, 5) * random([-1, 1]);
    this.yDir = random(1, 5) * random([-1, 1]);
  }

  size(h, w) {
    this.height = h;
    this.width = w;

    // Scale stroke weight with letter size
    if (this.height <= 0 || this.width <= 0) {
      this.weight = 0;
    } else {
      this.weight =
        (this.height * this.width) / (5 * (this.height + this.width));
    }
  }

  move(xDir, yDir) {
    this.x += xDir;
    this.y += yDir;
  }

  color(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  // Checks for intersection between self and otherLetter
  intersect(otherLetter) {
    if (
      this.x > otherLetter.x + otherLetter.width || // Right of letter
      this.x + this.width < otherLetter.x || // Left of letter
      this.y > otherLetter.y + otherLetter.height || // Above Letter
      this.y + this.height < otherLetter.y // Below Letter
    ) {
      return false;
    } else {
      return true;
    }
  }

  update() {
    var ofb = false;

    if (this.x + this.width >= width) {
      // Change Direction and Speed
      this.xDir = -random(1, 5);

      // Move back in bounds
      this.x = width - this.width - 1;

      ofb = true;
    } else if (this.x < 0) {
      // Change Direction and Speed
      this.xDir = random(1, 5);

      // Move back in bounds
      this.x = 0;

      ofb = true;
    }

    if (this.y + this.height >= height) {
      // Change Direction and Speed
      this.yDir = -random(1, 5);

      // Move back in bounds
      this.y = height - this.height - 1;

      ofb = true;
    } else if (this.y < 0) {
      // Change Direction and Speed
      this.yDir = random(1, 5);

      // Move back in bounds
      this.y = 0;

      ofb = true;
    }

    // If out of bounds, create expanding circle with random color at current location
    if (ofb) {
      circles[circlesIndex] = new expandCircle(
        this.x,
        this.y,
        random(0, 256),
        random(0, 256),
        random(0, 256)
      );
      // Create up to 10 circles, removing the oldest circle
      circlesIndex = (circlesIndex + 1) % 10;
    }

    // Move letter
    this.move(this.xDir, this.yDir);
  }
}

// State Draw Functions
function drawLogo() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("LOGO", 200, 200);
}

function drawPlay() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("PLAY", 200, 200);
}

function drawGameover() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("GAMEOVER", 200, 200);
}

// Key functions
function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}

// Main Functions
function setup() {
  createCanvas(400, 400);
  gameState = gameStates.LOGO;
}

function draw() {
  switch (gameState) {
    case gameStates.LOGO:
      drawLogo();

      // TODO: Transition to PLAY when enter is pressed
      if (keys[50]) {
        gameState = gameStates.PLAY;
      }
      break;

    case gameStates.PLAY:
      drawPlay();

      // TODO: Transition to GAMEOVER when win/lose conditions met
      if (keys[51]) {
        gameState = gameStates.GAMEOVER;
      }
      break;

    case gameStates.GAMEOVER:
      drawGameover();

      // TODO: Transition to LOGO when enter is pressed
      if (keys[49]) {
        gameState = gameStates.LOGO;
      }
      break;
  }
}
