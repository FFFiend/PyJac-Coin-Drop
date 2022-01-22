import {
    AIR_MASS, AIR_RADIUS
} from "./constants.js";

import { Particle } from "./generic-particle.js";

export class AirParticle extends Particle {
    constructor(p, x, y) {
        super(p, x, y);
    }

    display() {
        const { x, y } = this.location;
        this.p.ellipse(x, y, AIR_RADIUS);
    }

    detectCollision() {

        if (this.location.x + AIR_RADIUS >= this.p.width || this.location.x - AIR_RADIUS <= 0){
            this.velocity.x *= -1;
        }
        if (this.location.y + AIR_RADIUS >= this.p.height || this.location.y - AIR_RADIUS <= 0){
            this.velocity.y *= -1
            // if the speed is less than some max, then bounce back, else exit frame and delete the particle
        }
    }

    update() {
        // create a random acceleration vector and scale it
        // to a smaller value.
        this.acceleration = p5.Vector.random2D().mult(0.01, 0.01);
        // add acceleration to velocity
        this.velocity.add(this.acceleration);
        // add velocity to location
        this.location.add(this.velocity);

        this.detectCollision();
    }
}
