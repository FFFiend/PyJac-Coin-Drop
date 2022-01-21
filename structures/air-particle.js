import { Particle } from "./particle.js";

class AirParticle extends Particle {
  constructor(location, velocity, mass) {
    super(location, velocity, mass);
    
  }


  display() {
    stroke(0);
    fill(175);
    ellipse(location.x,location.y,mass*16,mass*16);
}

  airpart_update(){

    this.acceleration = Particle.random2D();

    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxvel)
    this.location.add(this.velocity)
  }



}