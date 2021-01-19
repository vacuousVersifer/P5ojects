/* global windowHeight windowWidth createCanvas width height angleMode DEGREES background translate stroke strokeWeight noFill beginShape endShape cos sin vertex CLOSE */

let canvas;

let n = 0;
let d = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display", "block");
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);

  noFill();
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < 360; i++) {
    let k = i * d;
    let r = 300 * sin(n * k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape(CLOSE);

  beginShape();
  stroke(0, 0, 255, 155);
  strokeWeight(4);
  for (let i = 0; i < 360; i++) {
    let k = i;
    let r = 300 * sin(n * k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape(CLOSE);

  n += 0.01;
  d += 0.01;
}
