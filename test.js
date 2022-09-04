function setup() {
  createCanvas(400, 400);
}

function draw() {
  var msg = "None";
  background(255);
  fill(255, 0, 0);
  
  if (keyIsPressed && (keyCode === RIGHT_ARROW)) {
    msg = "RIGHT";
  }
  if ((keyIsPressed === true) && (keyCode === LEFT_ARROW)) {
    msg = "LEFT";
  }
  text(msg + " is pressed", 200, 200);
}
