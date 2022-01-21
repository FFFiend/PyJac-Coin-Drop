// inside structures/particle.js

// instead of "Mover", name the class "Particle"
// and also export it so we can use it in other files
import { Vector } from "./vector.js"

export class Particle extends Vector {
    constructor(location, velocity, mass, maxvel) {
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.mass = mass;
        this.force = 0
        this.maxvel = maxvel
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

    limit (maxmag){

        if (this.magnitude > maxmag){
            this.magnitude = maxmag


        }
    }

}