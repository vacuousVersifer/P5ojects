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

let background_color;
let canvas;

function windowResized() {
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  let padding = size / 25;
  size = size - padding;

  canvas = createCanvas(size, size);

  background(background_color);
  
  let drops = new Array(500);

  for (let i = 0; i < drops.length; i++) {
    drops[i] = new Drop();
  }
}

let drops;
function init() {
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  let padding = size / 25;
  size = size - padding;

  canvas = createCanvas(size, size);

  background(background_color);
  
  drops = new Array(500);

  for (let i = 0; i < drops.length; i++) {
    drops[i] = new Drop();
  }
}
