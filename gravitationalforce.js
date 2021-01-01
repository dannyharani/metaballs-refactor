var G = 1;

//initializing the object used to create the reindeer
var Reindeer = function(m, x, y) {
    this.mass = m;
    this.position = new PVector(random(width), random(height));
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

//method that allows the reinder accelerate
Reindeer.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};
  
//method that updates the motion of the reindeer
Reindeer.prototype.update = function() {
    //adding velocity of the spaceship to acceleration
    this.velocity.add(this.acceleration);
    //adding the position of the spaceship to velocity
    this.position.add(this.velocity);
    //mutiplying the acceleration of the spaceship by 0
    this.acceleration.mult(0);
};

//method that displays the reindeer
Reindeer.prototype.display = function() {
    image(getImage("seasonal/red-nosed-winston"), this.position.x, this.position.y, this.mass*16, this.mass*16);
};

//method that calculates the force of attraction between the reinders
Reindeer.prototype.calculateAttraction = function(m, i) {
    // Calculating direction of force
    var force = PVector.sub(this.position, m.position);
    // defining variable that stores the distance between objects
    var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 5.0, 25.0);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction                            
    force.normalize();
    // Calculate gravitional force magnitude
    var strength = (G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
};

//method that allows the spaceship to remain on the canvas
Reindeer.prototype.checkEdges = function() {
    //condition for if any fish crossed the right border of the canvas
    if (this.position.x > width) {
        this.position.x = 0;
    } 
    //condition for if any fish crossed the left border of the canvas
    else if (this.position.x < 0) {
        this.position.x = width;
    }
    //condition for if any fish crossed the bottom border of the canvas
    if (this.position.y > height) {
        this.position.y = 0;
    } 
     //condition for if any fish crossed the uppermost border of the canvas
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

//defining an array used to store instances of the "Reindeer" object
var reindeers = [];
for (var i = 0; i < 5; i++) {
    //creating an instance of the "Reindeer" object
    reindeers[i] = new Reindeer(random(0.1, 5), random(width), random(height));
}

//calling the draw function    
draw = function() {
    //establishing the background of the canvas
    background(235, 254, 255);
    
    //loop used to check for gravitational attraction between ALL the reindeers
    for (var i = 0; i < reindeers.length; i++) {
        //loop used to check for gravitational attraction between EVERY TWO reindeer
        for (var j = 0; j < reindeers.length; j++) {
            //checking for if two reinders are near each other (and are not the same)
            if (i !== j) {
                //calling method that caculates the gravitational attraction between the two reinders
                var force = reindeers[j].calculateAttraction(reindeers[i]);
                //calling method that creates the gravitational attraction between the two reinders
                reindeers[i].applyForce(force);
            }
        }
    }
    
    //loop used to call the remaining methods of the object
    for (var i = 0; i < reindeers.length; i++) {
        reindeers[i].update();
        reindeers[i].checkEdges();
        reindeers[i].display();
    }
};


