import {
    WATER_PARTICLES, WATER_COLOR, WATER_RADIUS,
    WATER_MASS, WATER_REF_DENSITY, BULK_MODULUS,
    VISCOSITY
} from "./constants.js";

import { WaterParticle } from "./water-particle.js";

const PI = 3.14159;

export class Water {
    // provide the p5 library.
    constructor(p) {
        this.p = p;

        // Store particles.
        this.particles = [];

        for (let n = 0; n < WATER_PARTICLES / 2; n++) {
            const x = 160 + 30 * n;
            const y = 275;
            this.particles.push(new WaterParticle(p, x, y));  
        }
        for (let n = 0; n < WATER_PARTICLES / 2; n++) {
            const x = 160 + 30 * n;
            const y = 225;
            this.particles.push(new WaterParticle(p, x, y));  
        }
    }

    update() {
        this.computeDensities();
        this.computeAccelerations();

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

    computeDensities() {
        // Compute constant term first.
        const c = (4 * WATER_MASS) / (PI * WATER_RADIUS ** 8);
        // For every particle, loop over every OTHER particle
        // and if they are within radius then add densities.
        for (let i = 0; i < WATER_PARTICLES; i++) {
            const current = this.particles[i];
            // We loop from i + 1 till the end because we take
            // advantage of the fact that two particles i and j
            // within the radius will contribute to each other's
            // density equally, so we handle both in one iteration.
            // This means no need to check them again.
            for (let j = i + 1; j < WATER_PARTICLES; j++) {
                const other = this.particles[j];
                const ds = p5.Vector.sub(current.location, other.location);
                const distance = ds.mag();
                // If z is positive, then j is within the interaction
                // radius which means we update the density.
                const z = WATER_RADIUS ** 2 - distance ** 2;
                if (z > 0) {
                    // Compute increase in density
                    const rho = c * z ** 3;
                    if (i == 0) {
                        console.log("c:", c, "z:", z, "rho:", rho);
                    }
                    current.density += rho;
                    other.density += rho;
                }
            }
        }
    }

    computeAccelerations() {
        // Again we loop over particles checking which ones are
        // interacting and adding up their forces.
        for (let i = 0; i < WATER_PARTICLES; i++) {
            const current = this.particles[i];
            // Find interacting particles.
            for (let j = i + 1; j < WATER_PARTICLES; j++) {
                const other = this.particles[j];
                const ds = p5.Vector.sub(current.location, other.location);
                const distance = ds.mag();
                const z = WATER_RADIUS ** 2 - distance ** 2;
                if (z > 0) {
                    const m = WATER_MASS;
                    const h4 = WATER_RADIUS ** 4;
                    const rhoi = current.density;
                    const rhoj = other.density;
                    const rho0 = WATER_REF_DENSITY;
                    const mu = VISCOSITY;
                    const k = BULK_MODULUS;

                    const rij = ds;
                    const vij = p5.Vector.sub(current.velocity, other.velocity);
                    const qij = distance / WATER_RADIUS;

                    const c0 = (m / (PI * h4 * rhoj)) * (1 - qij);
                    const c1 = 15 * k * (rhoi + rhoj - 2 * rho0);
                    const c2 = (1 - qij) / qij;

                    if (i == 0) {
                        console.log("h4:", h4, "rhoi:", rhoi, "rhoj:", rhoj);
                        console.log("qij:", qij);
                        console.log("c0:", c0, "c1:", c1, "c2:", c2);
                    }

                    rij.mult(c1 * c2);
                    vij.mult(40 * mu);
                    rij.sub(vij);
                    rij.mult(c0);
                    rij.div(rhoi);

                    // Apply the acceleration
                    current.acceleration.add(rij);
                    other.acceleration.sub(rij);
                    other.velocity.mult(-1);
                }

            }
        }
    }
}

