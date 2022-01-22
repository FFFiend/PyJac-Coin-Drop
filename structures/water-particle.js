import {
    WATER_MASS, WATER_RADIUS,
    G_CONSTANT, WORLD_MASS,
    WORLD_CENTER_DISTANCE,
    POND_SECTION_A, 
    POND_SECTION_B,
    leftCurve, centerCurve,
    rightCurve

} from "./constants.js";

import { Particle } from "./generic-particle.js";

export class WaterParticle extends Particle {
    constructor(p, location) {
        super(p, location)
    }

    display() {
        const { x, y } = this.location;
        this.p.ellipse(x, y, WATER_RADIUS);
    }

    update() {
        // Get force by gravity.
        const gforce = this.getGravityForce();
        // apply gravity
        this.applyForce(gforce)
        // add acceleration to velocity
        this.velocity.add(this.acceleration);
        // add velocity to location
        this.location.add(this.velocity);
        // clear acceleration at the end, since after all forces
        // are applied, there is no more acceleration (remember,
        // a force is needed to accelerate an object, which then
        // affects velocity, but velocity on its doesn't change,
        // because an object in motion stays in motion!)
        this.acceleration.mult(0);
        this.detectCollision();
    }

    getPondSection() {
        if (this.location.x + WATER_RADIUS < 150) {
            return 1;
        } 
        if ( 150 <= this.location.x + WATER_RADIUS && this.location.x + WATER_RADIUS <= 450) {
            return 2;
        }
        if (this.location + WATER_RADIUS > 450) {
            return 3;
        }
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

    getGravityForce() {
        // The "ground" attracting the particle
        // is located directly below it's own location.
        const groundX = this.location.x
        const groundY = WORLD_CENTER_DISTANCE;
        const ground  = this.p.createVector(groundX, groundY);
        // Subtracting ground vector from location vector
        // gives a vector pointing all the way from the
        // particle to the ground.
        const force = p5.Vector.sub(ground, this.location);
        // The magnitude of it gives the distance between
        // particle and ground.
        const distance = this.p.constrain(force.mag(), 10, 1500);
        // We then normalize it, since currently only the
        // direction is accurate. The magnitude represents
        // the distance, not the actual force due to gravity.
        force.normalize();
        // Now we use the force due to gravity formula to find
        // the actualy magnitude of the force. Since this world
        // is created by us, the constants and masses are mostly
        // arbitrary, tweaked until everything looks roughly
        // realistic.
        const strength = (G_CONSTANT * WATER_MASS * WORLD_MASS) / (distance ** 2);
        force.mult(strength);
        return force;
    }

    detectCollision() {
        // Rudimentary collision detection, only for upper/lower walls.
        // Simply check if it hits a wall, and
        // then apply the "reaction" force, which
        // is just gforce in the opposite direction.
        
        if (this.getPondSection == 1) {
            if (this.location.x + WATER_RADIUS <= leftCurve(this.location.x)) {
                this.velocity.y *= -1;
            }
        }
        else if (this.getPondSection == 2) {
            if (this.location.x + WATER_RADIUS<= centerCurve(this.location.x)) {
                this.velocity.y *= -1;
            }
        }
        else {
            if (this.location.x + WATER_RADIUS<= rightCurve(this.location.x)) {
                this.velocity.y *= -1;
            }
        }
    }
}

