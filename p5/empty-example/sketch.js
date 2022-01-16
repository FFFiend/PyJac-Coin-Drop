class Vec {
    // magnitude, direction
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(a, b) {
        return;
    }
}

function setup() {
    createCanvas(600, 400);
    background("#f2f2f2");
    ellipse(50, 50, 20, 20);
}

let x = 50;
let y = 50;
let d = "R";
function draw() {
    background("#f2f2f2");

    if (d == "R") x = x + 5;
    if (d == "L") x = x - 5;

    if (x + 10 > width) d = "L";
    if (x - 10 < 0) d = "R";

    ellipse(x, y, 20, 20);
}
