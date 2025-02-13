import p5 from "p5"

export class Petal {
    private position: p5.Vector
    private velocity: p5.Vector
    private size: number
    private angle: number
    private angularVelocity: number
    private offset: number
    private petal: number[] = []

    constructor(private p: p5) {
        this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(-this.p.height, 0))
        this.velocity = this.p.createVector(0, this.p.random(0.2, 1)) // Falling speed
        this.size = this.p.random(15, 30)
        this.angle = this.p.random(this.p.TWO_PI)
        this.angularVelocity = this.p.random(-0.03, 0.03) // Rotation speed
        this.offset = this.p.random(50, 150) // For horizontal swaying
        this.petal = this.getShape()
    }

    private getShape() {
        return [
            this.p.random(0.4, 0.7),
            this.p.random(0.2, 0.4),
            this.p.random(0.4, 0.7),
            this.p.random(0.4, 0.7),
            this.p.random(0.2, 0.4),
            this.p.random(0.4, 0.7),
            this.p.random(0.4, 0.7),
            this.p.random(0.2, 0.4),
            this.p.random(0.2, 0.4),
            this.p.random(0.5, 0.8),
            this.p.random(0.4, 0.7),
        ]
    }

    update() {
        // Horizontal swaying using sine wave
        let sway = this.p.sin(this.p.frameCount / this.offset) * 2
        this.position.x += sway
        this.position.add(this.velocity)

        // Update rotation
        this.angle += this.angularVelocity

        // Reset when out of screen
        if (this.position.y > this.p.height + this.size) {
            this.petal = this.getShape()
            this.position.y = this.p.random(-this.p.height, 0)
            this.position.x = this.p.random(this.p.width)
            this.angle = this.p.random(this.p.TWO_PI) // Reset rotation
        }
    }

    display() {
        this.p.push()
        this.p.translate(this.position.x, this.position.y)
        this.p.rotate(this.angle)
        this.p.noStroke()
        this.drawGradientPetal(this.size)
        this.p.pop()
    }

    drawGradientPetal(size: number) {
        let ctx = this.p.drawingContext // Access canvas's 2D context
        let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)

        // Define gradient colors: white center to pink edges
        gradient.addColorStop(0, 'white')
        gradient.addColorStop(1, 'pink')

        ctx.fillStyle = gradient

        this.p.beginShape()
        this.p.vertex(0, -size * this.petal[0])
        this.p.bezierVertex(
            size * this.petal[1], -size * this.petal[2],
            size * this.petal[3], -size * this.petal[4],
            0, size * this.petal[5]
        )
        this.p.bezierVertex(
            -size * this.petal[6], -size * this.petal[7],
            -size * this.petal[8], -size * this.petal[9],
            0, -size * this.petal[10]
        )
        this.p.endShape(this.p.CLOSE)
    }
}