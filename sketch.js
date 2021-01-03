var blobs = [];

//Gravitational constant

var G = 2;

var sun;

setup = function() {
  createCanvas(400, 400);
  colorMode(HSB);
  for (var i = 0; i < 6; i++) {
  
    //randomly generated mass for gravitational effect: radius is a function of mass
    var mass = random(1, 12);
    blobs.push(new Blob(mass));
  }
  
  sun = new Sun();
  
};

draw = function() {
  background(255);
  
  loadPixels();
  
  for (var x = 0; x < width; x+=4) {
    for(var y = 0; y < height; y+=4) {
      let sum = 0;

      for(var i = 0; i < blobs.length; i++) {
        var d = blobs[i].position.dist(createVector(x, y));
        sum += 5 * blobs[i].r / d;
      }
      
      for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
          set(x+i, y+j, color(sum, 255, 255));
        }
      }
    }

  }

  updatePixels();
  
  for(var i = 0; i < blobs.length; i++) {
    for(var j = 0; j < blobs.length; j++) {

      blobs[i].addForce(blobs[j].position, blobs[j].mass);
      
      
    }
    blobs[i].addForce(sun.position, sun.mass);
    blobs[i].update();
    //blobs[i].checkEdges();
  }
  
  sun.orbit();
  sun.show();

};
