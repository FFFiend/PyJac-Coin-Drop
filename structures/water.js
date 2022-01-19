export class Liquid {
    constructor(x, y, w, h, c) {
        // x and y represent the coordinates of our "particle",
        // width and height represent its width and height, and
        // c represents the coefficient of the drag force.
        // The equation of the force of drag is
        // F_d = -0.5c*(v^2)*A*v_d
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.constant = c
    }
  
    display() {
        noStroke();
        fill(175);
        rect(this.x, this.y, this.w, this.h);
    }
  
  }