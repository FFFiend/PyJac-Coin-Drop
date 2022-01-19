// inside structures/particle.js

// instead of "Mover", name the class "Particle"
// and also export it so we can use it in other files
export class Particle {
    constructor(location, velocity, mass) {
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.mass = mass;
        this.force = 0
    }   
       
    applyForce(force) {
        this.force = this.force + force
        this.acceleration = (force / this.mass) + this.acceleration;
    }
    
    update() {
        velocity.add(acceleration);
        location.add(velocity);
        acceleration.mult(0);
    }
       
    display() {
        stroke(0);
        fill(175);
        ellipse(location.x,location.y,mass*16,mass*16);
    }


    checkEdges() {
        if (location.x > width) {
            location.x = width;
            velocity.x *= -1;
        } 
        else if (location.x < 0) {
            velocity.x *= -1;
            location.x = 0;
        }
        if (location.y > height) {
            velocity.y *= -1;
            location.y = height;
        }
    }

}