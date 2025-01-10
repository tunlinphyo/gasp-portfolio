import p5 from 'p5'

export class Water {
    private p: p5
    private cols: number
    private rows: number
    private current: number[][]
    private previous: number[][]

    private dampening: number = 1
    private effect: number = 50 // Max 255 pixel

    constructor(p: p5) {
        this.p = p
        this.cols = this.p.windowWidth
        this.rows = this.p.windowHeight
        this.current = new Array(this.cols).fill(0).map(_ => new Array(this.rows).fill(0))
        this.previous = new Array(this.cols).fill(0).map(_ => new Array(this.rows).fill(0))
    }

    setup() {
        this.p.pixelDensity(1)
        this.p.createCanvas(this.p.windowWidth, this.p.windowHeight)
    }

    draw() {
        // this.p.clear();
        this.p.background(0, 0)

        this.p.loadPixels();
        for (let i = 1; i < this.cols - 1; i++) {
            for (let j = 1; j < this.rows - 1; j++) {
                this.current[i][j] =
                (this.previous[i - 1][j] +
                    this.previous[i + 1][j] +
                    this.previous[i][j - 1] +
                    this.previous[i][j + 1]
                ) /
                2 -
                this.current[i][j];
                this.current[i][j] = this.current[i][j] * this.dampening;

            let pixel = 255 - this.current[i][j];

            let index = (i + j * this.cols) * 4;
            this.p.pixels[index + 0] = pixel;
            this.p.pixels[index + 1] = pixel;
            this.p.pixels[index + 2] = pixel;
            this.p.pixels[index + 3] = pixel > this.effect ? 0 : 255;
            }
        }
        this.p.updatePixels();

        let temp = this.previous;
        this.previous = this.current;
        this.current = temp;
    }

    mouseMoved() {
        this.previous[this.p.mouseX][this.p.mouseY] = 500
    }
}
