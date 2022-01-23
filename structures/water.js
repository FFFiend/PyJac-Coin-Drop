import {
    WATER_PARTICLES, WATER_COLOR, WATER_RADIUS
} from "./constants.js";

import { WaterParticle } from "./water-particle.js";

export class Water {
    // provide the p5 library.
    constructor(p) {
        this.p = p;

        // Store particles.
        this.particles = [];

        for (let n = 0; n < WATER_PARTICLES; n++) {
            if (n > 40) {
                const x = 30 * (n*(0.25))- 30*11*0.25 - 50;
                const y = 275 + 20;
                this.particles.push(new WaterParticle(p, x, y));
            }
            else{
              const x = 30 * (n*(0.25)) + 150 + WATER_RADIUS;
            const y = 275;
            this.particles.push(new WaterParticle(p, x, y));  
            }
            
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

