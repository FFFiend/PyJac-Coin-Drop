import {
    POND_COLOR, AIR_BOUNDARY,
    POND_SECTION_A, POND_SECTION_B,
    POND_QUAD_CENTER
} from "./constants.js"

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
        this.coin.update();
        this.water.update();
    }

    display() {
        // The pond is always the same, so the world
        // handles its drawing.
        this.drawPond();

        // For other objects, we use their display methods.
        this.water.display();
        this.coin.display();

        if (DEBUG) {
            // Only display air in debug mode.
            this.air.display();
            // Grids for different sections.
            this.drawGrid();
            // Shows frame count
            this.showFrameCount();
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
        // Pond sections.
        this.p.stroke("#1E3380");
        this.p.line(POND_SECTION_A, 0, POND_SECTION_A, this.p.height);
        this.p.line(POND_SECTION_B, 0, POND_SECTION_B, this.p.height);

        // Air boundary.
        this.p.stroke("#33801E");
        this.p.line(0, AIR_BOUNDARY, 600, AIR_BOUNDARY);

        // Pond quadrants.
        this.p.stroke("#801E33");
        const { x, y } = POND_QUAD_CENTER;
        this.p.line(x, 0, x, this.p.height);
        this.p.line(0, y, this.p.width, y);

        // Turn off stroke.
        this.p.noStroke();
    }

    showFrameCount() {
        this.p.fill(0);
        this.p.text(this.p.frameCount, 5, 15);
        this.p.noFill();
    }
}

