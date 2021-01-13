/* globals frameRate keyCode UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW mouseX mouseY color dist ellipse floor noStroke rect random nostroke fill createCanvas windowWidth windowHeight background resetMatrix translate width height rotate strokeWeight stroke line colorMode pow HSB map p5 vector noFill int angleMode DEGREES beginShape sin cos vertex endShape CLOSE createVector ceil float */

let canvas;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display", "block");
  background(0);
}

let i = 0;
let skip = 10;
let upper = 1000000;
function draw() {
  console.log(i);
  if (i <= upper) {
    for (let a = 0; a < skip; a++) {
      i++;

      let seq = [];
      let n = i;

      do {
        seq.push(n);
        n = collatz(n);
      } while (n != 1);

      seq.push(1);
      seq.reverse();

      let len = 5;
      let angle = 0.15;

      resetMatrix();
      translate(width / 2, height);

      for (let j = 0; j < seq.length; j++) {
        let val = seq[j];

        if (val % 2 == 0) {
          rotate(angle);
        } else {
          rotate(-angle);
        }

        strokeWeight(2);
        stroke(255, 10);
        line(0, 0, 0, -len);
        translate(0, -len);
      }
    }
  } else {
    return;
  }
}

function collatz(n) {
  // even
  if (n % 2 == 0) {
    return n / 2;
    // odd
  } else {
    return (n * 3 + 1) / 2;
  }
}
