/* global createCanvas windowWidth windowHeight floor width height Cell background */

function setup() {
  init();
}

function draw() {
  background(background_color);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  let y = a.j - b.j;

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function windowResized() {
  make_canvas()

  grid = new Array();
  stack = new Array();

  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

let cols, rows, w, grid, current, stack;
function init() {
  make_canvas()

  w = 30;
  grid = new Array();
  stack = new Array();

  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
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