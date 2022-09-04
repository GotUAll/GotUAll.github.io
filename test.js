// Letter move around independantly and bounce off walls
// Each bounce causes circles to spread out from that location
// When the letters intersect, the bg and letter color will be randomized
// The letter color is the negative of the bg color so that the letters are always visible

// Arrays to hold the objects
var initials = [];
var circles = [];
var circlesIndex = 0;

// Background color values
var r = 0;
var g = 0;
var b = 0;

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

class letterA extends letter {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    // Draw Capital A
    stroke(this.red, this.green, this.blue);
    strokeWeight(this.weight);

    line(this.x, this.y + this.height, this.x + this.width / 2, this.y);
    line(
      this.x + this.width / 2,
      this.y,
      this.x + this.width,
      this.y + this.height
    );
    line(
      this.x + 0.25 * this.width,
      this.y + this.height / 2,
      this.x + 0.75 * this.width,
      this.y + this.height / 2
    );
  }
}

class letterY extends letter {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    // Draw Capital Y
    stroke(this.red, this.green, this.blue);
    strokeWeight(this.weight);
    line(this.x, this.y, this.x + this.width / 2, this.y + this.height / 2);
    line(
      this.x + this.width,
      this.y,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
    line(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.x + this.width / 2,
      this.y + this.height
    );
  }
}

function setup() {
  createCanvas(400, 400);
  var h = 25;
  var w = 25;

  // Draw in center of canvas
  initials[0] = new letterA(width / 2 - w / 2, height / 2 - h / 2);
  initials[1] = new letterY(width / 2 - w / 2, height / 2 - h / 2);
  initials[0].size(h, w);
  initials[1].size(h, w);
}

function draw() {
  background(r, g, b);

  // Update and display letters
  for (var i = 0; i < initials.length; i++) {
    initials[i].color(255 - r, 255 - g, 255 - b);
    initials[i].display();
    initials[i].update();

    // Check for intersection between letters
    for (var j = i + 1; j < initials.length; j++) {
      if (initials[i].intersect(initials[j])) {
        r = random(0, 256);
        g = random(0, 256);
        b = random(0, 256);
      }
    }
  }

  // Update and display expanding circles
  for (var i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].update();
  }
}
