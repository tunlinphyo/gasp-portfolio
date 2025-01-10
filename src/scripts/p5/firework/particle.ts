import p5 from "p5"

export class Particle {
    public pos: p5.Vector
    public vel: p5.Vector
    private acc: p5.Vector
    public hu: number
    private trail: p5.Vector[] = [] // Stores positions for the tail

    private firework: boolean
    private lifespan: number // Shorter lifespan for limited tails

    constructor(private p: p5, x: number, y: number, firework: boolean, hu?: number) {
        this.pos = this.p.createVector(x, y)
        this.firework = firework

        if (this.firework) {
            this.vel = this.p.createVector(0, this.p.random(-18, -10))
        } else {
            this.vel = p5.Vector.random2D()
            this.vel.mult(this.p.random(8, 20))
        }

        this.lifespan = firework ? (30 * Math.abs(this.vel.y)) : 180
        this.acc = this.p.createVector(0, 0)
        this.hu = hu || this.p.random(255)
    }

    applyForce(force: p5.Vector) {
        this.acc.add(force)
    }

    update() {
        if (!this.firework) {
            this.vel.mult(0.9)
            this.lifespan -= 4
        }

        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)

        // Store the trail positions
        // if (!this.firework) {
        // }
        this.trail.push(this.pos.copy())
        if (this.trail.length > 10) {
            this.trail.shift() // Limit the length of the trail
        }
    }

    done() {
        return this.lifespan < 0
    }

    show() {
        this.p.colorMode(this.p.HSB)

        // Draw the tail
        for (let i = 0; i < this.trail.length; i++) {
            let alpha = this.p.map(i, 0, this.trail.length, 0, this.lifespan / 255)
            this.p.stroke(this.hu, 255, 255, alpha)
            this.p.strokeWeight(4)
            this.p.point(this.trail[i].x, this.trail[i].y)
        }

        // Draw the particle
        if (!this.firework) {
            this.p.strokeWeight(4)
            this.p.stroke(this.hu, 255, 255, this.lifespan / 255)
        } else {
            this.p.strokeWeight(6)
            this.p.stroke(this.hu, 255, 255)
        }
        this.p.point(this.pos.x, this.pos.y)
    }
}