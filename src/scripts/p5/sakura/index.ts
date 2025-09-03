import p5 from 'p5'
import { Flowers } from './flowers'

export const sakuraSketch = (p: p5) => {
    let flowers: Flowers

    p.setup = () => {
        p.frameRate(40)
        flowers = new Flowers(p)
        flowers.setup()
    }

    p.draw = () => {
        flowers.draw()
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}

