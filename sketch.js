class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x = this.x + other.x;
        this.y = this.y + other.y;
    }
}

// Using this pattern prevents p5 from polluting
// the global namespace.
const sketch = P5 => {
    let location = new Vector(50, 50);

    P5.setup = () => {
        P5.createCanvas(600, 400);
    }

    P5.draw = () => {
        P5.background("#f2f2f2");

        P5.ellipse(location.x, location.y, 20, 20);
        let velocity = new Vector(Math.random() * 2, Math.random() * 2);
        location.add(velocity);

    }
}

// Instantiate and run sketch.
const instance = new p5(sketch, "simulation");

