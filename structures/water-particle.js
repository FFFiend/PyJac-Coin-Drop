import {
    WATER_MASS, WATER_RADIUS,
    G_CONSTANT, WORLD_MASS,
    WORLD_CENTER_DISTANCE,
    leftCurve, centerCurve,
    rightCurve
} from "./constants.js";

import { Particle } from "./generic-particle.js";

export class WaterParticle extends Particle {
    constructor(p, x, y) {
        super(p, x, y)
    }

    display() {
        const { x, y } = this.location;
        this.p.ellipse(x, y, WATER_RADIUS);
    }

    update() {
        // First, we get vectors for all forces that are acting
        // on the particle.
        const gforce = this.getGravityForce();

        // Then we apply all those forces.
        this.applyForce(gforce)

        // The forces affect acceleration, so next we
        // apply acceleration to the particle, by
        // updating it's velocity.
        this.velocity.add(this.acceleration);

        // After that we update it's location by applying
        // the velocity.
        this.location.add(this.velocity);

        // We clear acceleration at the end, since after forces
        // are applied, there is no more acceleration (because
        // a force is needed to accelerate an object, which then
        // affects velocity, but velocity on its own doesn't
        // change - an object in motion stays in motion!)
        this.acceleration.mult(0);

        // Finally we detect collisions for the particle.
        this.detectCollision();
    }

    applyForce(force) {
        // F = m*a, so to get change in acceleration
        // we use a = F/m, i.e divide force by mass.
        // We also use a new vector object instead of the
        // original force, in case the original is reused
        // by the calling code.
        const f = p5.Vector.div(force, WATER_MASS);
        this.acceleration.add(force);
    }

    // Returns vector for force of gravity.
    getGravityForce() {
        const groundX = this.location.x
        const groundY = this.getPondBoundary();
        const ground  = this.p.createVector(groundX, groundY);
        const force = p5.Vector.sub(ground, this.location);
        force.normalize();
        force.mult(0.098);
        return force;
    }

    detectCollision() {
        // Reverse velocity when it hits lower boundary.
        const boundary = this.getPondBoundary();
        if (this.location.y + WATER_RADIUS >= boundary) {
            this.location.y = boundary - WATER_RADIUS;
            this.velocity.y *= -1;
        }
    }

    // Returns section of the pond the particle is
    // currently inside.
    getPondSection() {
        if (this.location.x < 150) {
            return 1;
        }
        if (150 <= this.location.x && this.location.x <= 450) {
            return 2;
        }
        if (this.location.x > 450) {
            return 3;
        }
    }

    // Gets the lower boundary for the particle based on its
    // pond section.
    getPondBoundary() {
        if (this.getPondSection() == 1) {
            return this.p.height - leftCurve(this.location.x);
        }
        if (this.getPondSection() == 2) {
            return this.p.height - centerCurve(this.location.x);
        }
        if (this.getPondSection() == 3) {
            return this.p.height - rightCurve(this.location.x);
        }
    }
}

