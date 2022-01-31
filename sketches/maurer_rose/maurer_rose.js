/* global windowHeight windowWidth createCanvas width height angleMode DEGREES background translate stroke strokeWeight noFill beginShape endShape cos sin vertex CLOSE */

function setup() {
  init();

  angleMode(DEGREES);
}

function draw() {
  background(background_color);
  translate(width / 2, height / 2);
  stroke(255);

  noFill();
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < 3600; i++) {
    let k = i * d;
    let r = (width / 2.5) * sin(n * k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape(CLOSE);

  beginShape();
  stroke(0, 0, 255, 155);
  strokeWeight(4);
  for (let i = 0; i < 3600; i++) {
    let k = i;
    let r = (width / 2.5) * sin(n * k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape(CLOSE);

  // n += 0.01;
  // d += 0.01;
}

function windowResized() {
  make_canvas()

  n = 0;
  d = 0;
}

let n, d;
function init() {
  make_canvas()

  n = 180;
  d = 9;
}

const background_color = 0;
let canvas;
function make_canvas() {
  let div_height = document.getElementById("name_header").clientHeight;
  
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  let padding = size / 25;
  
  let n_height = windowHeight - div_height - padding;

  canvas = createCanvas(n_height, n_height);
  canvas.parent("canvas_container")

  background(background_color);
}