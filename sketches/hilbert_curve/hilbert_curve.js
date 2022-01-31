/* globals windowHeight windowWidth createCanvas colorMode background int width height HSB pow stroke strokeWeight line noFill map p5 frameRate*/

function setup() {
  colorMode(HSB, 360, 255, 255);

  init();
}

function draw() {
  for (let i = 0; i < step; i++) {
    if (counter + i < path.length) {
      stroke(255);
      strokeWeight(5);
      noFill();
      let h = map(counter, 0, path.length, 0, 360);
      stroke(h, 255, 255);
      line(
        path[counter + i].x,
        path[counter + i].y,
        path[counter + i - 1].x,
        path[counter + i - 1].y
      );
    } else {
      reset = true;
    }
  }

  if (reset) {
    saveCanvas()
    // reset = false;
    background(0);
    counter = 1;
  } else {
    counter += step;
  }
}

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}


function windowResized() {
  make_canvas()

  counter = 1;
}

let order, N, total, path, counter, step, reset;
function init() {
  make_canvas()

  order = 8;
  N, total;
  path = new Array();
  counter = 1;
  step = 100;
  reset = false;

  N = int(pow(2, order));
  total = N * N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
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