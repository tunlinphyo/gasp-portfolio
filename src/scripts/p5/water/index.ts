import p5 from 'p5'
import { Water } from './water'

export const waterSketch = (p: p5) => {
    let water: Water

    p.setup = () => {
        p.frameRate(60)
        water = new Water(p)
        water.setup()
    }

    p.draw = () => {
        water.draw()
    }

    p.mouseMoved = () => {
        water.mouseMoved()
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}