var blobs = [];

//Gravitational constant
const G = 10;

setup = function() {
  createCanvas(400, 400);
  colorMode(HSB);
  for (var i = 0; i < 6; i++) {
    
    //randomly generated mass for gravitational effect: radius is a function of mass
    var mass = random(1, 12);

    blobs.push(new Blob(mass));
  }
};

draw = function() {

  loadPixels();
  
  for (var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      let sum = 0;

      for(var i = 0; i < blobs.length; i++) {
        var d = blobs[i].position.dist(createVector(x, y));
        sum += 5 * blobs[i].r / d;
      }

      set(x, y, color(sum, 255, 255));

    }

  }

  updatePixels();

  for(var i = 0; i < blobs.length; i++) {
    for(var j = 0; j < blobs.length; j++) {

      blobs[i].addForce(blobs[j].position, blobs[j].mass);
      
    }
  }

  for(i = 0; i < blobs.length; i++) {
    blobs[i].update();
  }

};
