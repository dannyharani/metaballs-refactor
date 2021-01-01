var Blob = function(mass) {

    this.mass = mass;

    this.position = createVector(random(0, width), random(0, height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.r = map(mass, 1, 12, 400, 1000);

};

Blob.prototype.update = function() {

    this.velocity.add(this.acceleration);

    this.velocity.limit(8);

    this.position.add(this.velocity);
};

Blob.prototype.addForce = function(pos, mass) {
    var position = createVector(this.position.x, this.position.y);

    var force = position.sub(pos);
    
    var dist = force.mag();
    dist = constrain(dist, 1, 10);

    force.normalize();
    force.mult(G * this.mass * mass / (dist * dist));

    this.acceleration.add(force.mult(-1));
};
