/* globals frameRate keyCode UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW mouseX mouseY color dist ellipse floor noStroke rect random nostroke fill createCanvas windowWidth windowHeight background resetMatrix translate width height rotate strokeWeight stroke line colorMode pow HSB map p5 vector noFill int angleMode DEGREES beginShape sin cos vertex endShape CLOSE createVector ceil float */
/* globals Snake Apple */

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
