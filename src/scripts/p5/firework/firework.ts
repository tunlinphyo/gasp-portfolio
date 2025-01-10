import p5 from "p5"
import { Particle } from "./particle"

export class Firework {
    private firework: Particle
    private exploded: boolean = false
    private particles: any[] = []

    constructor(private p: p5) {
        this.firework = new Particle(this.p, this.p.random(this.p.width), this.p.height, true)
    }

    update(gravity: p5.Vector) {
        if (!this.exploded) {
            this.firework.applyForce(gravity)
            this.firework.update()
            if (this.firework.vel.y >= 0) {
                this.exploded = true
                this.explode()
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity)
            this.particles[i].update()
            if (this.particles[i].done()) {
                this.particles.splice(i, 1)
            }
        }
    }

    explode() {
        const hu = this.p.random(1) > 0.4
        for (let i = 0; i < 100; i++) {
            let p = new Particle(this.p, this.firework.pos.x, this.firework.pos.y, false, hu ? this.firework.hu : undefined)
            this.particles.push(p)
        }
    }

    done() {
        return this.exploded && this.particles.length === 0
    }

    show() {
        if (!this.exploded) {
            this.firework.show()
        }

        for (let particle of this.particles) {
            particle.show()
        }
    }
}