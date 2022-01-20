import { POND_COLOR } from "./constants.js"
import { Water } from "./water.js";
import { Coin } from "./coin.js";
import { Air } from "./air.js"

// Represents the "world" of the simulation - e.g. handling
// constants like gravity, drawing the pond, plus some other
// useful functionality.
export class World {
    // when creating a new world instance, we give it the
    // p5 library variable as an argument so we can use
    // its functions.
    constructor(p) {
        this.p = p;

        this.water = new Water(p);
        this.air   = new Air(p);
        this.coin  = new Coin(p);
    }

    update() {
        this.air.update();
        this.water.update();
        this.coin.update();
    }

    display() {
        // The pond is always the same, so the world
        // handles its drawing.
        this.drawPond();

        // For other objects, we use their display methods.
        this.water.display();
        this.coin.display();

        if (DEBUG) {
            // Air is invisible, so only display
            // under debug mode.
            this.air.display();
            // Pond section grid.
            this.drawGrid();
        }
    }

    drawPond() {
        const w = this.p.width;
        const h = this.p.height;

        this.p.fill(POND_COLOR);

        this.p.beginShape();
        this.p.vertex(0, h);
        this.p.vertex(0, h*3/4);
        this.p.bezierVertex(w/8,      h*3/4,    w/4-20,   h*3/4-30, w/4,   h*3/4);
        this.p.bezierVertex(w/4+20,   h*15/16,  w*3/4-20, h*15/16,  w*3/4, h*3/4);
        this.p.bezierVertex(w*3/4+20, h*3/4-30, w*7/8,    h*3/4,    w,     h*3/4);
        this.p.vertex(w, h);
        this.p.endShape();
    }

    drawGrid() {
        // Red line for pond sections.
        this.p.stroke("#ff0000");
        this.p.line(150, 0, 150, this.p.height);
        this.p.line(450, 0, 450, this.p.height);
        // Black line for air section.
        this.p.stroke(0);
        const h = this.p.height;
        this.p.line(0, h*3/4-10, 600, h*3/4-10);
    }
}

