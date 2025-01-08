import p5 from 'p5'
import { Snow } from './snow'
import { Leaves } from './fall'
import { Flowers } from './sakura'

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

export const sakuraSketch = (p: p5) => {
    let flowers: Flowers

    p.setup = () => {
        p.frameRate(60)
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