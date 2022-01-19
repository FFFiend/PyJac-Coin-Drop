export class Liquid {
    constructor(x, y, w, h, c) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = c
    }
  
    display() {
        noStroke();
        fill(175);
        rect(this.x, this.y, this.w, this.h);
    }
  
  }