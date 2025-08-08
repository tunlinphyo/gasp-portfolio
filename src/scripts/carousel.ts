import gsap from "gsap"
import { Utils } from './utils'

export class Carousel {
    private carousel: HTMLOListElement
    private carouselItems: NodeListOf<HTMLLIElement>
    private lefts: number[]
    private tempLeft: number
    private animation: GSAPTween | null

    constructor(selector: string) {
        this.carousel = Utils.elem<HTMLOListElement>(selector)
        this.carouselItems = Utils.elems('li', this.carousel)
        this.lefts = []
        this.tempLeft = 0
        this.animation = null

        this.init()
    }

    private init() {
        if (!this.carouselItems.length) return

        Utils.applyStyles(this.carousel, { left: `${this.carouselItems[0].clientWidth * -2}px` })

        this.carouselItems.forEach((item) => {
            const width = item.clientWidth
            this.lefts.push(this.tempLeft)
            this.tempLeft += width
        })

        gsap.set(".carousel-item", {
            x: (i) => this.lefts[i]
        })

        this.animation = gsap.from([...this.carouselItems], {
            duration: 30,
            ease: "none",
            x: `+=${this.tempLeft}`,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % this.tempLeft)
            },
            repeat: -1,
            paused: true,
        })
    }

    public play() {
        if (this.animation) {
            this.animation.play()
        }
    }

    public pause() {
        if (this.animation) {
            this.animation.pause()
        }
    }
}
