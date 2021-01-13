//Sun constructor function
var Sun = function() {
    //Angle is based on itteration
    this.itterator = 0;
    
    //position in center of screen
    this.position = createVector(width/2, height/2);
    this.mass = 10;
};

//Orbit function orbits the sun around the center of canvas
Sun.prototype.orbit = function() {
    //Position is based on cos and sin functions to have circular motion
    this.position.x = cos(this.itterator);
    this.position.y = sin(this.itterator);
    
    //Multiply position to have a larger radius
    this.position.mult(110);
    //Base it on center
    this.position.add(200, 200);
    //increase itterator
    this.itterator += 0.05;
};

//Shows the sun object as an ellips with position values calculated above
Sun.prototype.show = function() {
    fill('yellow');
    ellipse(this.position.x, this.position.y, 40, 40);
};
