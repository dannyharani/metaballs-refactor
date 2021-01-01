var blobs = []

function setup() {
  createCanvas(400, 200);
  colorMode(HSB);
  for (i = 0; i < 10; i++) blobs.push(new Blob(random(0, width), random(0, height)));
}

function draw() {
  //background(220);

  //loadPixels();
  
  for(var xPix = 0; xPix < width; xPix++) {
    for(var yPix = 0; yPix < height; yPix++) {
      let sum = 0;
      for (i = 0; i < blobs.length; i++) {
        let xdif = xPix - blobs[i].position.x;
        let ydif = yPix - blobs[i].position.y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += 10 * blobs[i].r / d;
        
      }
      //set(xPix, yPix, color(xPix % 255, yPix % 255, 255));
      set(xPix, yPix, color(sum % 255, 255, 255));
    }
  }

  updatePixels();
  
  for (i = 0; i < blobs.length; i++) {
    blobs[i].update();
    blobs[i].checkEdges();
  }
}
