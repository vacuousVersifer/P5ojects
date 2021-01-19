/* global createCanvas windowWidth windowHeight Drop background */

let canvas;

let drops = new Array(500);

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display", "block");

  for (let i = 0; i < drops.length; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  background(230, 230, 250);

  for (let i = 0; i < drops.length; i++) {
    let drop = drops[i];
    drop.fall();
    drop.show();
  }
}
