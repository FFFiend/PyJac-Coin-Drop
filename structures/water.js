import {
    WATER_PARTICLES, WATER_COLOR,
} from "./constants.js";

import { WaterParticle } from "./water-particle.js";

export class Water {
    // provide the p5 library.
    constructor(p) {
        this.p = p;

        // Store particles.
        this.particles = [];

        for (let n = 0; n < WATER_PARTICLES; n++) {
            const location = this.p.createVector(50 * (n+1), 10 * (n+1));
            this.particles.push(new WaterParticle(p, location));
        }
    }

    update() {
        for (const particle of this.particles) {
            particle.update();
        }
    }

    display() {
        if (DEBUG) this.p.stroke(0);
        else this.p.noStroke();

        this.p.fill(WATER_COLOR);

        for (const particle of this.particles) {
            particle.display();
        }
    }
}

