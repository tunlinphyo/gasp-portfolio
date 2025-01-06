import p5 from 'p5'
import { Leaf } from './leaf'

export class Leaves {
    private p: p5
    private leaf: Leaf[] = []
    private gravity: any
    // private zOff: number = 0

    private spritesheet: p5.Image
    private textures: p5.Image[] = [];
    private maxCount: number

    constructor(p: p5, img: p5.Image) {
        this.p = p
        this.spritesheet = img
        // this.maxCount = this.p.constrain(Math.round(Math.sqrt(innerWidth * innerHeight) * 0.1), 50, 300)
        this.maxCount = Math.round((innerWidth * innerHeight) ** (1 / 6))
    }

    setup() {
        this.p.createCanvas(window.innerWidth, window.innerHeight)
        this.gravity = this.p.createVector(0, 0.002);
        for (let x = 0; x < this.spritesheet.width; x += 32) {
            for (let y = 0; y < this.spritesheet.height; y += 32) {
                let img = this.spritesheet.get(x, y, 32, 32);
                // this.p.image(img, x, y);
                console.log(x, y)
                if (
                    !((x == 0 && y == 0) || (x == 32 && y == 32) || (x == 32 && y == 64) || (x == 160 && y == 96))
                ) {
                    this.textures.push(img);
                }
            }
        }


        for(let i = 0; i < this.maxCount; i++) {
            let design = this.p.random(this.textures);
            this.leaf.push(new Leaf(this.p, design));
        }
    }

    draw() {
        this.p.clear();
        this.p.background(0, 0)
        // this.zOff += 0.1;

        for (let flake of this.leaf) {
            // let xOff = flake.pos.x / this.p.width;
            // let yOff = flake.pos.y / this.p.height;
            // let wAngle = this.p.noise(xOff, yOff, this.zOff) * this.p.TWO_PI;
            // let wind = p5.Vector.fromAngle(wAngle);
            let wind = p5.Vector.random2D()
            wind.mult(0.02);

            flake.applyForce(this.gravity);
            flake.applyForce(wind);
            flake.update();
            flake.render();
        }

    }
}
