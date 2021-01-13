/* globals frameRate keyCode UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW mouseX mouseY color dist ellipse floor noStroke rect random nostroke fill createCanvas windowWidth windowHeight background resetMatrix translate width height rotate strokeWeight stroke line colorMode pow HSB map p5 vector noFill int angleMode DEGREES beginShape sin cos vertex endShape CLOSE createVector ceil float */
/* globals Star */

let canvas;

let stars = new Array(1000);
let speed = 10;
let maxspeed = 50;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display", "block");

  for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star(speed);
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  speed = map(mouseX, 0, width, 0, maxspeed);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update(speed);
    stars[i].show();
  }
}
