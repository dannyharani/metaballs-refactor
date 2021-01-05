var Sun = function() {
    this.itterator = 0;
    this.position = createVector(width/2, height/2);
    this.mass = 10;
};

Sun.prototype.orbit = function() {
    this.position.x = cos(this.itterator);
    this.position.y = sin(this.itterator);

    this.position.mult(110);
    this.position.add(200, 200);
    this.itterator += 0.01;
};

Sun.prototype.show = function() {
    fill('yellow');
    ellipse(this.position.x, this.position.y, 40, 40);
};
