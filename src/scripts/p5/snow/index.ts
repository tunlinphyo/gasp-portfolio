import p5 from 'p5'
import { Snowflake } from './snowflake'

export class Snow {
    private p: p5
    private snow: Snowflake[] = []
    private gravity: any
    private zOff: number = 0

    private spritesheet: p5.Image
    private textures: p5.Image[] = [];
    private maxCount: number

    constructor(p: p5, img: p5.Image) {
        this.p = p
        this.spritesheet = img
        // this.maxCount = this.p.constrain(Math.round(Math.sqrt(innerWidth * innerHeight) * 0.1), 50, 300)
        this.maxCount = Math.round((innerWidth * innerHeight) ** (1 / 2.5))
    }

    setup() {
        this.p.createCanvas(window.innerWidth, window.innerHeight)
        this.gravity = this.p.createVector(0, 0.03);
        for (let x = 0; x < this.spritesheet.width; x += 32) {
            for (let y = 0; y < this.spritesheet.height; y += 32) {
                let img = this.spritesheet.get(x, y, 32, 32);
                // this.p.image(img, x, y);
                this.textures.push(img);
            }
        }

        let design = this.p.random(this.textures);
        this.snow.push(new Snowflake(this.p, design));
    }

    draw() {
        this.p.clear();
        this.p.background(0, 0)
        this.zOff += 0.1;

        const count = this.p.frameCount % 10

        if (count === 0 && this.snow.length < this.maxCount) {
            let design = this.p.random(this.textures);
            this.snow.push(new Snowflake(this.p, design));
            console.log(this.snow.length)
        }

        for (let flake of this.snow) {
            let xOff = flake.pos.x / this.p.width;
            let yOff = flake.pos.y / this.p.height;
            let wAngle = this.p.noise(xOff, yOff, this.zOff) * this.p.TWO_PI;
            let wind = p5.Vector.fromAngle(wAngle);
            wind.mult(0.02);

            flake.applyForce(this.gravity);
            flake.applyForce(wind);
            flake.update();
            flake.render();
        }

    }
}
