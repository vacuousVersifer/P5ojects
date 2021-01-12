let canvas;

let order, N, total, path;

function setup() {
  canvas = createCanvas(windowWidth, windowWidth);
  canvas.style("display", "block");

  colorMode(HSB, 360, 255, 255);

  order = 6;
  N = pow(2, order);
  total = N * N;

  path = new Array(total);

  for (let i = 0; i < counter; i++) {
    path[i] = hilbert(i);

    let wLen = width / N;
    let hLen = height/ N;
    path[i].mult(wLen, hLen);
    path[i].add(wLen / 2, hLen / 2);
  }
}

let counter = 1;
let change = 1;

function draw() {
  background(0);

  strokeWeight(order);

  if (counter >= path.length || counter < 0) {
    change *= -1;
    counter += change;
  }

  for (let i = 1; i < total; i++) {
    let h = map(i, 0, path.length, 0, 360);
    stroke(h, 255, 255);

    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }

  counter += change;
}

function hilbert(i) {
  let points = [];

  points.push(createVector(0, 0));
  points.push(createVector(0, 1));
  points.push(createVector(1, 1));
  points.push(createVector(1, 0));

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;

    let len = pow(2, j);
    if (index === 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index === 1) {
      v.y += len;
    } else if (index === 2) {
      v.x += len;
      v.y += len;
    } else if (index === 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }

  return v;
}
