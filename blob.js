var Blob = function(x, y) {
  this.position = new createVector(x, y);
  let angle = random(0, 2 * PI);
  this.velocity = new createVector(random(2, 5) * Math.cos(angle), random(2, 5) * Math.sin(angle));
  this.acceleration = new createVector(0, 0);
  this.r = random(120, 240);
}

//method that allows the reinder accelerate
Blob.prototype.applyForce = function(force) {
    var f = createVector.div(force, this.mass);
    this.acceleration.add(f);
};

Blob.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}

Blob.prototype.checkEdges = function() {
  if (this.position.x > width || this.position.x < 0) {
    this.velocity.x *= -1;
    
  } else if (this.position.y > height || this.position.y < 0) {
    this.velocity.y *= -1;
  }
};

Blob.prototype.show = function() {
  noFill();
  stroke(0);
  strokeWeight(4);
  ellipse(this.position.x / map(noise(0, 1), 0, 1, 100, width/2), this.position.y / map(noise(0, 1), 0, 1, 100, height/2), this.r * 2, this.r * 2);
}
