/* global createCanvas windowWidth windowHeight width height Cell background mouseX mouseY */

function setup() {
  init()
}

function draw() {
  background(background_color);
  for (var i = 0; i < cells.length; i++) {
    cells[i].move();
    cells[i].show();
  }
}

function mousePressed() {
  for (var i = cells.length - 1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}

function keyPressed() {
  for (let i = 0; i > cells.length; i--) {
    let cell = new Cell();
    cells[i] = cell;
  }
}

function windowResized() {
  make_canvas()

  cells = new Array(10);
  
  for (let i = 0; i < cells.length; i++) {
    let cell = new Cell();
    cells[i] = cell;
  }
}

let cells;
function init() {
  make_canvas()

  cells = new Array(10);
  
  for (let i = 0; i < cells.length; i++) {
    let cell = new Cell();
    cells[i] = cell;
  }
}

const background_color = 200;
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