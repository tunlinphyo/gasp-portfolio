import p5 from 'p5'
import { Firework } from './firework'

export class FireWorkWorker {
    private fireworks: Firework[] = []
    private gravity: p5.Vector

    constructor(private p: p5) {
        this.gravity = this.p.createVector(0, 0.2)
    }

    setup() {
        const cnv = this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
        cnv.attribute("aria-hidden", "true")
        cnv.attribute("role", "presentation")
        this.p.colorMode(this.p.HSB)
        this.p.stroke(255)
        this.p.strokeWeight(8)
        this.p.background(0, 0)
    }

    draw() {
        this.p.clear()

        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            this.fireworks[i].update(this.gravity)
            this.fireworks[i].show()
            if (this.fireworks[i].done()) {
                this.fireworks.splice(i, 1)
            }
        }

        if (window.firework && this.p.random(1) < 0.04) {
            this.fireworks.push(new Firework(this.p))
        }
    }
}
