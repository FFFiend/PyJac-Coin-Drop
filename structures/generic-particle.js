export class Particle {
    constructor(p, location) {
        this.p = p;
        this.location = location;
        this.velocity = this.p.createVector(0, 0);
        this.acceleration = this.p.createVector(0, 0);
        this.force = 0
    }

    applyForce(force) {
        this.force = this.force + force
        this.acceleration = (force / this.mass) + this.acceleration;
    }
}
