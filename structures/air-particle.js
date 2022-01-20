import {
    AIR_MASS, AIR_RADIUS
} from "./constants.js";

import { Particle } from "./generic-particle.js";

export class AirParticle extends Particle {
    constructor(p, location) {
        super(p, location);
    }

    display() {
        const { x, y } = this.location;
        this.p.ellipse(x, y, AIR_RADIUS);
    }

    update() {
        // create a random acceleration vector and scale it
        // to a smaller value.
        this.acceleration = p5.Vector.random2D().mult(0.01, 0.01);
        // add acceleration to velocity
        this.velocity.add(this.acceleration);
        // add velocity to location
        this.location.add(this.velocity);
    }
}
