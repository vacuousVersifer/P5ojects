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

function windowResized() {
  make_canvas()

  stars = new Array(1000);

  for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star(speed);
  }
}

let stars, speed, maxspeed;
function init() {
  make_canvas()

  stars = new Array(1000);
  speed = 10;
  maxspeed = 50;

  for (let i = 0; i < stars.length; i++) {
    stars[i] = new Star(speed);
  }
}

const background_color = 0;
let canvas;
function make_canvas() {
  let div_height = document.getElementById("name_header").clientHeight;
  
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  let padding = size / 25;
  
  let n_width = windowWidth - padding * 2;
  let n_height = windowHeight - div_height - padding;

  canvas = createCanvas(n_width, n_height);
  canvas.parent("canvas_container")

  background(background_color);
}
