import p5 from 'p5'
import { Petal } from './petal'

export class Flowers {
    private p: p5
    private petals: Petal[] = []

    constructor(p: p5) {
        this.p = p
    }

    setup() {
        const cnv = this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
        cnv.attribute("aria-hidden", "true")
        cnv.attribute("role", "presentation")
        for (let i = 0; i < 10; i++) {
            this.petals.push(new Petal(this.p))
        }
    }

    draw() {
        this.p.clear()
        this.p.background(0, 0)

        for (let petal of this.petals) {
            petal.update()
            petal.display()
        }
    }
}
