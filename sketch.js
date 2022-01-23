import { World } from "./structures/world.js";
import { CANVAS_SIZE } from "./structures/constants.js";
// Using this pattern prevents p5 from polluting
// the global namespace.
const sketch = p => {
    let world = new World(p);

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
    }

    p.draw = () => {
        p.background("#f2f2f2");
        world.update();
        world.display();
    }

    const pauseBtn = document.querySelector("#pause");
    pauseBtn.addEventListener("change", () => {
        if (pauseBtn.checked) p.noLoop();
        else p.loop();
    });

    const restartBtn = document.querySelector("#restart");
    restartBtn.addEventListener("click", () => {
        world.reset();
        p.frameCount = 0;
    });
}

// Instantiate and run sketch.
const instance = new p5(sketch, "simulation");

