import p5 from 'p5'
import { Snow } from './snows'

export const snowSketch = (p: p5) => {
    let snow: Snow
    let img: p5.Image
    let loaded: boolean = false

    p.preload = () => {
        img = p.loadImage('/snowflake32.png', () => {
            loaded = true
        })
    }

    p.setup = () => {
        p.frameRate(60)
        snow = new Snow(p, img)
        snow.setup()
    }

    p.draw = () => {
        if (loaded) {
            snow.draw()
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}
