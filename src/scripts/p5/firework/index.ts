import p5 from 'p5'
import { FireWorkWorker } from './worker'

export const fireworkSketch = (p: p5) => {
    let worker: FireWorkWorker

    p.setup = () => {
        p.frameRate(60)
        worker = new FireWorkWorker(p)
        worker.setup()
    }

    p.draw = () => {
        worker.draw()
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}