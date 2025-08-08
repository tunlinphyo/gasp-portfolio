import p5 from 'p5'
import { Leaves } from './leaves'

export const fallSketch = (p: p5) => {
    let leaves: Leaves
    let img: p5.Image
    let loaded: boolean = false

    p.preload = () => {
        img = p.loadImage('/fall32.png', () => {
            loaded = true
        })
    }

    p.setup = () => {
        p.frameRate(60)
        leaves = new Leaves(p, img)
        leaves.setup()
    }

    p.draw = () => {
        if (loaded) {
            leaves.draw()
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}
