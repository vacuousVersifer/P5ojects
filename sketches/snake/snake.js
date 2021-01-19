/* global createCanvas windowWidth windowHeight width height frameRate Snake Apple background keyCode UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW mouseX mouseY */

let canvas;

let snake;
let apple;
let scl = 20;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display", "block");
  frameRate(10);

  snake = new Snake();
  apple = new Apple();
}

function draw() {
  background(127);

  apple.show();
  snake.death();
  snake.eat();
  snake.update();
  snake.show();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.dir(0, -1);
      break;
    case RIGHT_ARROW:
      snake.dir(1, 0);
      break;
    case DOWN_ARROW:
      snake.dir(0, 1);
      break;
    case LEFT_ARROW:
      snake.dir(-1, 0);
      break;
  }
}

function mousePressed() {
  console.log(mouseX);
  console.log(mouseY);
}
