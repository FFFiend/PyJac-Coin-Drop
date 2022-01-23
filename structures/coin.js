import {
    COIN_SIZE, COIN_COLOR,
    COIN_MASS, DROP_POINT, WORLD_CENTER_DISTANCE
} from "./constants.js";
import { Particle } from "./generic-particle.js";
export class Coin extends Particle {
    constructor(p,x,y) {
        super(p,300,200);

        // Create location vector using drop point
        // coordinates.
        
        this.location = this.p.createVector(300, 200);
        this.velocity = this.p.createVector(0, 0);
        this.acceleration = this.p.createVector(0, 0);
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
        if (  296 <= this.location.x && this.location.x <= 298 && 555 <= this.location.y && this.location.y <= 557){
            this.acceleration = (0,0);
            this.velocity = (0,0);
        }
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
        
        force.mult(0.098);
        return force;
    }

}
