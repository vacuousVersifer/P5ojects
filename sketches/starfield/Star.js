/* global random width height fill noStroke map ellipse stroke strokeWeight line */

class Star {
  constructor(speed) {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    this.speed = speed;
  }

  update(speed) {
    this.speed = speed;

    this.z -= this.speed;

    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;

      this.pz = this.z;
    }
  }

  show() {
    fill(255);
    noStroke();

    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);

    this.r = map(this.z, 0, width, 16, 0);

    ellipse(this.sx, this.sy, this.r, this.r);

    stroke(255);
    strokeWeight(1);

    this.px = map(this.x / this.pz, 0, 1, 0, width);
    this.py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    line(this.px, this.py, this.sx, this.sy);
  }
}
