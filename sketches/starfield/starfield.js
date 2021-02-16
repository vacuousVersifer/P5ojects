/* global createCanvas windowWidth windowHeight Star background translate width height mouseX map */

function setup() {
  init();
}

function draw() {
  background(background_color);
  translate(width / 2, height / 2);

  speed = map(mouseX, 0, width, 0, maxspeed);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update(speed);
    stars[i].show();
  }
}

const background_color = 0;
let canvas;

function windowResized() {
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  let padding = size / 25;
  size = size - padding;

  canvas = createCanvas(size, size);

  background(background_color);

  stars = new Array(1000);

  for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star(speed);
  }
}

let stars, speed, maxspeed;
function init() {
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  let padding = size / 25;
  size = size - padding;

  canvas = createCanvas(size, size);

  background(background_color);

  stars = new Array(1000);
  speed = 10;
  maxspeed = 50;

  for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star(speed);
  }
}
