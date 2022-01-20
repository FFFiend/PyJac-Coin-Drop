import { World } from "./structures/world.js";

// Using this pattern prevents p5 from polluting
// the global namespace.
const sketch = p => {
    const world = new World(p);

    p.setup = () => {
        p.createCanvas(600, 400);
    }

    p.draw = () => {
        p.background("#f2f2f2");
        world.drawPond();
        world.drawWater();
        world.drawCoin();
    }
}

// Instantiate and run sketch.
const instance = new p5(sketch, "simulation");

