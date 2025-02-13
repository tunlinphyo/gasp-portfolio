import p5 from "p5"

export interface TreeConfig {
    size: number;
    maxLevel: number;
    rot: number;
    lenRand: number;
    branchProb: number;
    rotRand: number;
    flowerProb: number;
    mutating: boolean;
}

export class SakuraTree {
    private config: TreeConfig = {
        size: 200,
        maxLevel: 12,
        rot: 0.37,
        lenRand: 1,
        branchProb: 0.95,
        rotRand: 0.2,
        flowerProb: 0.67,
        mutating: true
    }
    private paramSeed: number = Math.floor(Math.random() * 5000)
    private randBias: number = 0
    private prog: number = 1

    constructor(private p: p5) {
        this.startGrow = this.startGrow.bind(this)
        this.mutate = this.mutate.bind(this)
        this.branch = this.branch.bind(this)
        this.grow = this.grow.bind(this)
    }

    public startGrow() {
        this.prog = 1
        this.grow()
    }

    public mutate(randSeed: number) {
        if (!this.config.mutating) return

        let startTime = this.p.millis()
        this.p.randomSeed(this.paramSeed)

        let n = this.p.noise(startTime / 12000) - 0.5

        this.randBias = 4 * Math.abs(n) * n

        this.paramSeed = 1000 * this.p.random()
        this.p.randomSeed(randSeed)

        let diff = this.p.millis() - startTime

        if (diff < 20) setTimeout(this.mutate, 20 - diff)
        else setTimeout(this.mutate, 1)
    }

    public branch(level: number, seed: number) {
        if (this.prog < level) return

        this.p.randomSeed(seed)

        let seed1 = this.p.random(500),
            seed2 = this.p.random(500)

        let growthLevel = this.prog - level > 1 || this.prog >= this.config.maxLevel + 1 ? 1 : this.prog - level

        this.p.strokeWeight(18 * Math.pow((this.config.maxLevel - level + 1) / this.config.maxLevel, 2))

        let len = growthLevel * this.config.size * (0.6 + this.rand2() * this.config.lenRand)

        this.p.line(0, 0, 0, len / level)
        this.p.translate(0, len / level)

        let doBranch1 = this.prog <= 2 ? true : this.rand() < this.config.branchProb
        let doBranch2 = this.prog <= 2 ? true : this.rand() < this.config.branchProb

        let doFlower = this.rand() < this.config.flowerProb

        if (level < this.config.maxLevel) {
            let r1 = this.config.rot * (1 + this.rrand() * this.config.rotRand)
            let r2 = -this.config.rot * (1 - this.rrand() * this.config.rotRand)

            if (doBranch1) {
                this.p.push()
                this.p.rotate(r1)
                this.branch(level + 1, seed1)
                this.p.pop()
            }
            if (doBranch2) {
                this.p.push()
                this.p.rotate(r2)
                this.branch(level + 1, seed2)
                this.p.pop()
            }
        }

        if ((level >= this.config.maxLevel || (!doBranch1 && !doBranch2)) && doFlower) {
            let p = Math.min(1, Math.max(0, this.prog - level))

            let flowerSize = (this.config.size / 100) * p * (1 / 6) * (len / level)

            this.p.strokeWeight(1)
            this.p.stroke(255, 132, 217)

            this.p.rotate(-this.p.PI)
            for (let i = 0; i <= 8; i++) {
                this.p.line(0, 0, 0, flowerSize * (1 + 0.5 * this.rand2()))
                this.p.rotate((2 * this.p.PI) / 8)
            }
        }
    }

    private rand() {
        return this.p.random(1000) / 1000
    }

    private rand2() {
        return this.p.random(2000) / 1000 - 1
    }

    private rrand() {
        return this.rand2() + this.randBias
    }

    private grow() {
        if (this.prog > this.config.maxLevel + 3) {
            this.prog = this.config.maxLevel + 3
            this.p.loop()
            return
        }

        let startTime = this.p.millis()
        this.p.loop()
        let diff = this.p.millis() - startTime

        this.prog += ((this.config.maxLevel / 8) * Math.max(diff, 20)) / 1000
        setTimeout(this.grow, Math.max(1, 20 - diff))
    }
}