// Represents the "world" of the simulation - e.g. handling
// constants like gravity, drawing the pond, plus some other
// useful functionality.

export class World {
    // when creating a new world instance, we give it the
    // p5 library variable as an argument so we can use
    // its functions.
    constructor(p) {
        this.p = p;

        // constants
        this.GRAVITY = 0.98;
        this.DROP_POINT = [300, 200];
        this.POND_COLOR = "#000000";
        this.COIN_COLOR = "#c9b30e";
        this.COIN_SIZE = [15, 3];
    }

    drawPond() {
        let w = this.p.width;
        let h = this.p.height;

        this.p.fill(this.POND_COLOR);

        this.p.beginShape();
        this.p.vertex(0, h);
        this.p.vertex(0, h*3/4);
        this.p.bezierVertex(w/8,      h*3/4,    w/4-20,   h*3/4-30, w/4,   h*3/4);
        this.p.bezierVertex(w/4+20,   h*15/16,  w*3/4-20, h*15/16,  w*3/4, h*3/4);
        this.p.bezierVertex(w*3/4+20, h*3/4-30, w*7/8,    h*3/4,    w,     h*3/4);
        this.p.vertex(w, h);
        this.p.endShape();
    }

    drawCoin() {
        if (DEBUG) this.p.stroke();
        else this.p.noStroke();

        const [x, y] = this.DROP_POINT;
        const [w, h] = this.COIN_SIZE;

        this.p.fill(this.COIN_COLOR);
        this.p.rect(x - w/2, y - h/2, w, h);
    }

    drawWater() {
        // pass
    }

    drawAir() {
        // pass
    }
}

