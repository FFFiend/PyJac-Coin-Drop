import {
    AIR_PARTICLES
} from "./constants.js";

import { AirParticle } from "./air-particle.js";

export class Air {
    // provide the p5 library
    constructor(p) {
        this.p = p;

        // Store particles.
        this.particles = [];

        for (let n = 0; n < AIR_PARTICLES; n++) {
            const x = 10 * (n+1);
            const y =  50 * (n+1);
            this.particles.push(new AirParticle(p, x, y));
        }
    }

    update() {
        for (const particle of this.particles) {
            particle.update();
        }
    }

    // This is only ever called in debug mode,
    // so no need for if-checking debug mode.
    display() {
        this.p.stroke(0);
        this.p.fill(255);

        for (const particle of this.particles) {
            particle.display();
        }
    }
}

