import {
    COIN_SIZE, COIN_COLOR,
    COIN_MASS, DROP_POINT
} from "./constants.js";

export class Coin {
    constructor(p) {
        this.p = p;

        // Create location vector using drop point
        // coordinates.
        const { x, y } = DROP_POINT;
        this.location = this.p.createVector(x, y);
        this.velocity = this.p.createVector(0, 0,);
        this.acceleration = this.p.createVector(0, 0);
    }

    update() {
        // pass
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
}

