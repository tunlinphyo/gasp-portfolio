// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

import p5 from "p5"

function getRandomSize(p: p5) {
    let r = p.pow(p.random(0, 1), 3)
    return p.constrain(r * 32, 5, 32)
  }


export class Snowflake {
    private img: any
    public pos: p5.Vector
    private vel: p5.Vector
    private acc: p5.Vector
    private angle: number
    private dir: number
    private xOff: number = 0
    private r: number

    constructor(private p: p5, img: any) {
      this.r = getRandomSize(this.p);
      let x = this.p.random(this.p.width);
      let y = this.p.random(-this.p.height, -this.r);
      this.img = img;
      this.pos = this.p.createVector(x, y);
      this.vel = this.p.createVector(0, 0);
      this.acc = this.p.createVector();
      this.angle = this.p.random(this.p.TWO_PI);
      this.dir = (this.p.random(1) > 0.5) ? 1 : -1;
    }


    applyForce(force: p5.Vector) {
      let f = force.copy();
      f.mult(this.r);

      // let f = force.copy();
      // f.div(this.mass);
      this.acc.add(f);
    }

    randomize() {
      this.r = getRandomSize(this.p);
      let x = this.p.random(this.p.width);
      let y = this.p.random(-this.p.height, -this.r);
      this.pos = this.p.createVector(x, y);
      this.vel = this.p.createVector(0, 0);
      this.acc = this.p.createVector();
    }

    update() {

      this.xOff = this.p.sin(this.angle * 2) * 2 * this.r;

      this.vel.add(this.acc);
      this.vel.limit(this.r * 0.2);

      if (this.vel.mag() < 1) {
        this.vel.normalize();
      }

      this.pos.add(this.vel);
      this.acc.mult(0);

      if (this.pos.y > this.p.height + this.r) {
        this.randomize();
      }

      // Wrapping Left and Right
      if (this.pos.x < -this.r) {
        this.pos.x = this.p.width + this.r;
      }
      if (this.pos.x > this.p.width + this.r) {
        this.pos.x = -this.r;
      }

      this.angle += this.dir * this.vel.mag() / 200;

    }

    render() {
      // stroke(255);
      // strokeWeight(this.r);
      // point(this.pos.x, this.pos.y);
      this.p.push();
      this.p.translate(this.pos.x + this.xOff, this.pos.y);
      this.p.rotate(this.angle);
      this.p.imageMode(this.p.CENTER);
      this.p.image(this.img, 0, 0, this.r, this.r);
      this.p.pop();
    }

}
