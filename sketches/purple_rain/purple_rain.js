/* global createCanvas windowWidth windowHeight Drop background */

function setup() {
  background_color = color(230, 230, 250);
  
  init()
}

function draw() {
  background(background_color);

  for (let i = 0; i < drops.length; i++) {
    let drop = drops[i];
    drop.fall();
    drop.show();
  }
}

function windowResized() {
  make_canvas()
  
  let drops = new Array(500);

  for (let i = 0; i < drops.length; i++) {
    drops[i] = new Drop();
  }
}

let drops;
function init() {
  make_canvas()
  
  drops = new Array(500);

  for (let i = 0; i < drops.length; i++) {
    drops[i] = new Drop();
  }
}

let background_color;
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