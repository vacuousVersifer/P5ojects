/* globals frameRate keyCode UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW mouseX mouseY color dist ellipse floor noStroke rect random nostroke fill createCanvas windowWidth windowHeight background resetMatrix translate width height rotate strokeWeight stroke line colorMode pow HSB map p5 vector noFill int angleMode DEGREES beginShape sin cos vertex endShape CLOSE createVector ceil float */
/* globals scl */

class Apple {
  constructor() {
    let location = pickLocation();
    this.x = location.x;
    this.y = location.y;
  }

  show() {
    noStroke();
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
