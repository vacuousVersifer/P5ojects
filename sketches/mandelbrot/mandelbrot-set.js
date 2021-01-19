let canvas;

let zoomSlider, zoom;
let xSlider, xOff;
let ySlider, yOff

function setup() {
  if (windowHeight > windowWidth) {
    canvas = createCanvas(windowWidth, windowWidth);
  } else {
    canvas = createCanvas(windowHeight, windowHeight);
  }
  canvas.style("display", "block");

  zoomSlider = createSlider(0.01, 2.50, 2.5, 0.01);
  xSlider    = createSlider(-10, 10, 0, 0.1);
  ySlider    = createSlider(-10, 10, 0, 0.1);
}

function draw() {
  pixelDensity(1);
  loadPixels();

  let maxIterations = 100;

  zoom = zoomSlider.value();
  xOff = xSlider.value();
  yOff = ySlider.value();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, -zoom, zoom) + xOff;
      let b = map(y, 0, height, -zoom, zoom) + yOff;

      let ca = a;
      let cb = b;

      let n = 0;
      let z = 0;

      while (n < 100) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(aa + bb) > 16) {
          break;
        }

        n++;
      }

      let bright = map(n, 0, maxIterations, 0, 255);
      if (n == maxIterations) {
        bright = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}