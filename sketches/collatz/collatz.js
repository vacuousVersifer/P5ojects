/* globals createCanvas windowWidth windowHeight background resetMatrix translate width height rotate strokeWeight stroke line */

function setup() {
  init();
}

let i = 0;
let skip = 10;
let upper = 1000000;
function draw() {
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

function windowResized() {
  make_canvas()
  
  i = 0;
}

function init() {
  make_canvas()

  i = 0;
  skip = 10;
  upper = 1000000;
}

const background_color = 0;
let canvas;
function make_canvas() {
  let div_height = document.getElementById("name_header").clientHeight;
  
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  let padding = size / 25;
  
  let n_width = windowWidth - padding * 2;
  let n_height = windowHeight - div_height - padding;

  canvas = createCanvas(n_width, n_height);
  canvas.parent("canvas_container")

  background(background_color);
}