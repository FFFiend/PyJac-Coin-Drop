import { Vec } from "./structures/vec.js";

// Using this pattern prevents p5 from polluting
// the global namespace.
const sketch = P5 => {
    let x = 50;
    let y = 50;
    let dir = "R";

    P5.setup = () => {
        P5.createCanvas(600, 400);
    }

    P5.draw = () => {
        P5.background("#f2f2f2");

        if (dir == "R") x += 4;
        if (dir == "L") x -= 4;

        if (x + 10 > P5.width) dir = "L";
        if (x - 10 < 0) dir = "R";

        P5.ellipse(x, y, 20, 20);
    }
}

// Instantiate and run sketch.
const instance = new p5(sketch);

