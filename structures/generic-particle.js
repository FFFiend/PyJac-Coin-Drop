export class Particle {
    constructor(p, x, y) {
        this.p = p;
        this.location = this.p.createVector(x,y);
        this.velocity = this.p.createVector(0, 0);
        this.acceleration = this.p.createVector(0, 0);
    }
}

