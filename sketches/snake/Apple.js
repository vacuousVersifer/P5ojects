class Apple {
  constructor() {
    let location = pickLocation();
    this.x = location.x;
    this.y = location.y;
  }

  show() {
    noStroke()
    fill(random(200, 255), random(0, 10), random(0, 10));
    rect(this.x, this.y, scl, scl);
  }

  move() {
    let location = pickLocation();
    this.x = location.x;
    this.y = location.y;
  }
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);

  let x = floor(random(cols));
  let y = floor(random(rows));

  x *= scl;
  y *= scl;

  return { x: x, y: y };
}