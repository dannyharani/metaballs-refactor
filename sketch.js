function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background(220);

  loadPixels();
  
  for(var xPix = 0; xPix < width; xPix++) {
    for(var yPix = 0; yPix < height; yPix++) {
      set(xPix, yPix, color(xPix % 255, yPix % 255, 255))
    }
  }

  updatePixels();
}
