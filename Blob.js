//initiating the Blob Object by constructing its constructor
var Blob = function(mass) {
  this.mass = mass;
  this.position = createVector(random(0, width), random(0, height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.r = map(mass, 1, 12, 400, 1400);
};

//method the uodates the motion of the Blob object
Blob.prototype.update = function() {
  //updating the velocity by using acceleration (since acceleration directly impacts velocity)
  this.velocity.add(this.acceleration);

  //restricting the value of the velocity to avoid the Blob from moving too fast
  this.velocity.limit(8);
    
  //updating the position by using velocity (since velocity directly impacts position)
  this.position.add(this.velocity);

};

//method the creates the gravitational attraction between two Blobs
Blob.prototype.addForce = function(pos, mass) {
  //substracting the position between 
  var position = createVector(this.position.x, this.position.y);
      
  // subtracting the position defined in the constructor, by the position given in the parameter to calculate the distance between the centers 
  var force = position.sub(pos);

  //determining direction of gravity, and restrict the magnitude of gravity.
  var dist = force.mag();

  dist = constrain(dist, 10, 25);

  force.normalize();
  
  //Force’s magnitude is set equal to the Gravitational field equation using the distance calculated to the sun object and both masses
  force.mult(G * this.mass * mass / (dist * dist));
    
  //setting acceleration of Blob to 0
  this.acceleration.mult(0);
  this.acceleration.add(force.mult(-1));

};
