import p5 from 'p5'
import { SakuraTree } from './sakura'

export class Flowers {
    private p: p5
    private tree: SakuraTree
    private randSeed: number = Math.floor(Math.random() * 1000)

    constructor(p: p5) {
        this.p = p
        this.tree = new SakuraTree(this.p)

        this.tree.mutate(this.randSeed)
        this.tree.startGrow()
    }

    setup() {
        this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
        // this.p.frameRate(24)
    }

    draw() {
        this.p.clear()
        this.p.stroke(50)
        this.p.background(0, 0)

        this.p.translate(this.p.width * 0.85, this.p.height + 32)
        this.p.scale(1, -1)

        this.p.translate(0, 20)

        this.tree.branch(1, this.randSeed)
    }
}
