let canvas;

let cells = new Array(10);

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display", "block");

  for (let i = 0; i < cells.length; i++) {
    let cell = new Cell();
    cells[i] = cell;
  }
}

function draw() {
  background(200);
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
