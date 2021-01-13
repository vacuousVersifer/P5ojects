/* globals frameRate keyCode UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW mouseX mouseY color dist ellipse floor noStroke rect random nostroke fill createCanvas windowWidth windowHeight background resetMatrix translate width height rotate strokeWeight stroke line colorMode pow HSB map p5 vector noFill int angleMode DEGREES beginShape sin cos vertex endShape CLOSE createVector ceil float */

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
