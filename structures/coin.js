import {
    COIN_SIZE, COIN_COLOR,
    COIN_MASS, DROP_POINT,
    centerCurve
} from "./constants.js";

import { Particle } from "./generic-particle.js";

export class Coin extends Particle {
    constructor(p) {
        super(p, 300, 200);
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


    display() {
        if (DEBUG) this.p.stroke(0);
        else this.p.noStroke();

        // coin color.
        this.p.fill(COIN_COLOR);
        // Use x, y coordinates as the center for
        // it's location.
        this.p.rectMode(this.p.CENTER);
        const { x, y } = this.location;
        // width, height.
        const { w, h } = COIN_SIZE;
        // draw coin.
        this.p.rect(x, y, w, h);
    }

    applyForce(force) {
        // F = m*a, so to get change in acceleration
        // we use a = F/m, i.e divide force by mass.
        // We also use a new vector object instead of the
        // original force, in case the original is reused
        // by the calling code.
        const f = p5.Vector.div(force, COIN_MASS);
        this.acceleration.add(force);
    }

    getGravityForce() {
        const groundX = this.location.x;
        const groundY = this.getPondBoundary();
        const ground  = this.p.createVector(groundX, groundY);
        const force = p5.Vector.sub(ground, this.location);
        force.normalize();
        force.mult(0.098);
        return force;
    }

    detectCollision() {
        const boundary = this.getPondBoundary();
        if (this.location.y + COIN_SIZE.h >= boundary) {
            // Just have it stop once it hits ground.
            this.velocity.mult(0);
        }
    }

    getPondBoundary() {
        return this.p.height - centerCurve(this.location.x);
    }

}
