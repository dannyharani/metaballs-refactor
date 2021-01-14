//Array of blobs
var blobs = [];

//Gravitational constant
var G = 1.7;

//Sun object variable decleration outside of setup scope
var sun;

setup = function() {
  frameRate(24);
  createCanvas(400, 400);
  
  //Use color mode that allows us to use sum value
  colorMode(HSB);
  
  //generate blobs
  for (var i = 0; i < 6; i++) {
  
    //randomly generated mass for gravitational effect: radius is a function of mass
    var mass = random(1, 12);
    blobs.push(new Blob(mass));
  }
  
  //create new instance of sun object
  sun = new Sun();
  
};


draw = function() {
  background(255);
  
  //loadPixels creates the pixels[] array which allows us to set the color
  loadPixels();
  
  //every OTHER pixel in column
  for (var x = 0; x < width; x+=2) {
    //every OTHER pixel in row
    for(var y = 0; y < height; y+=2) {
      //Set sum to zero, will change based on blob proximity
      let sum = 0;
      
      //Itterate through every blob
      for(var i = 0; i < blobs.length; i++) {
        //Check distance
        var d = blobs[i].position.dist(createVector(x, y));
        //increment sum proportinally to radius and inversly proportional to d
        sum += 5 * blobs[i].r / d;
      }
      
      //Since not every pixel is set, set color of missed pixel with last calculated color
      for(var i = 0; i < 2; i++) {
        for(var j = 0; j < 2; j++) {
          set(x+i, y+j, color(sum, 255, 255));
        }
      }
    }

  }
  
  //Set colors with new pixels[] array
  updatePixels();
  
  //For every blob
  for(var i = 0; i < blobs.length; i++) {
    
    //for(var j = 0; j < blobs.length; j++) {
      //blobs[i].addForce(blobs[j].position, blobs[j].mass);
    //}
    
    //add force with sun object
    blobs[i].addForce(sun.position, sun.mass);
    //update
    blobs[i].update();
    //blobs[i].checkEdges();
  }
  
  //update sun
  sun.orbit();
  sun.show();

};
