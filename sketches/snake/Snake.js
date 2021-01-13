/* globals frameRate keyCode UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW mouseX mouseY color dist ellipse floor noStroke rect random nostroke fill createCanvas windowWidth windowHeight background resetMatrix translate width height rotate strokeWeight stroke line colorMode pow HSB map p5 vector noFill int angleMode DEGREES beginShape sin cos vertex endShape CLOSE createVector ceil float */
/* globals scl apple */

class Snake {
  constructor() {
    let location = pickLocation();
    this.x = location.x;
    this.y = location.y;
    this.xSpeed = 1;
    this.ySpeed = 0;

    this.total = 0;
    this.tail = [];
  }

  dir(x, y) {
    if (!(x === this.xSpeed * -1) && !(y === -this.ySpeed * -1)) {
      this.xSpeed = x;
      this.ySpeed = y;
    }
  }

  update() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.die();
    }

    this.x += this.xSpeed * scl;
    this.y += this.ySpeed * scl;
  }

  show() {
    noStroke();
    for (let i = 0; i < this.tail.length; i++) {
      fill(random(0, 10), random(200, 255), random(0, 10));
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(0, 255, 0);
    rect(this.x, this.y, scl, scl);
  }

  eat() {
    let d = dist(this.x, this.y, apple.x, apple.y);
    if (d < 1) {
      this.total++;
      apple.move();
    }
  }

  death() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);

      if (d < 1) {
        this.die();
      }
    }
  }

  die() {
    let location = pickLocation();
    this.x = location.x;
    this.y = location.y;
    this.xSpeed = 1;
    this.ySpeed = 0;

    this.total = 0;
    this.tail = [];
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
