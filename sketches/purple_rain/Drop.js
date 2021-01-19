/* global random height width map strokeWeight stroke line */

class Drop {
  constructor() {
    this.x = random(width);
    this.y = random(-height + 100, -50);
    this.z = random(0, 20);

    this.len = map(this.z, 0, 20, 10, 20);
    this.ySpeed = map(this.z, 0, 20, 4, 10);
  }

  fall() {
    if (this.y > height) {
      this.x = random(width);
      this.y = random(-height + 100, -50);
      this.z = random(0, 20);

      this.len = map(this.z, 0, 20, 10, 20);
      this.ySpeed = map(this.z, 0, 20, 4, 10);
    }

    this.y += this.ySpeed;

    let gravity = map(this.z, 0, 20, 0, 0.2);
    this.ySpeed += gravity;
  }

  show() {
    strokeWeight(map(this.z, 0, 20, 1, 3));
    stroke(138, 43, 226);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
