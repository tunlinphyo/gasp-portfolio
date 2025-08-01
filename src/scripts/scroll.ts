import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"
// import { addClass, dataSet, elem, hasClass, removeClass, toggleClass } from "./helpers/utils"
import { Utils } from './utils';

interface AutoScrollerConfig {
    initialDirection?: number | string
    scrollSpeed?: number
    stopDelay?: number
}

export class AutoScroller {
    private moveDirection: number | string
    private stopDelay: number
    private scrollSpeed: number
    private autoScroll: any | null
    private scrollTrigger: Observer | null
    private button: HTMLButtonElement

    private isPlaying: boolean = false
    private touchStartY: number = 0

    constructor(config: AutoScrollerConfig = {}) {
        this.button = Utils.elem<HTMLButtonElement>('.playPause')
        this.moveDirection = config.initialDirection ?? "max"
        this.stopDelay = config.stopDelay ?? 0.25
        this.scrollSpeed = config.scrollSpeed ?? 350
        this.autoScroll = null
        this.scrollTrigger = null

        this.onWheel = this.onWheel.bind(this)
        this.onStop = this.onStop.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)

        this.initScrollTrigger()
        this.initTouchEvents()

        // setTimeout(() => {
        //     this.play()
        // }, 1500)
    }

    private getCurrentScroll(): number {
        return window.scrollY || window.pageYOffset
    }

    private getTargetPosition(): number {
        if (this.moveDirection === "max") {
            return document.documentElement.scrollHeight - window.innerHeight
        }
        return 0
    }

    private calculateDuration(distance: number): number {
        return distance / this.scrollSpeed
    }

    private initAutoScroll(): void {
        if (this.autoScroll) {
            this.autoScroll.kill()
        }

        const currentScroll = this.getCurrentScroll()
        const targetScroll = this.getTargetPosition()
        const distance = Math.abs(targetScroll - currentScroll)
        const duration = this.calculateDuration(distance)

        this.autoScroll = gsap.to(window, {
            duration,
            scrollTo: { y: this.moveDirection },
            ease: "none",
            overwrite: true,
            onComplete: () => {
                this.isPlaying = false
                this.updateButton()
            }
        })
    }

    private initScrollTrigger(): void {
        this.scrollTrigger = ScrollTrigger.observe({
            type: "wheel,scroll",
            onWheel: this.onWheel,
            onStop: this.onStop,
            onStopDelay: this.stopDelay
        })

        this.button.addEventListener('click', () => {
            if (Utils.hasClass(this.button, 'disabled')) return

            Utils.addClass(this.button, 'disabled')
            setTimeout(() => {
                Utils.removeClass(this.button, 'disabled')
            }, 500)

            if (this.isPlaying) {
                this.pause()
            } else {
                this.play()
            }
        })
    }

    public toggle(keyboard: boolean = false) {
        if (this.isPlaying) {
            this.pause(keyboard)
        } else {
            this.play(keyboard)
        }
    }

    private initTouchEvents(): void {
        window.addEventListener("touchstart", this.onTouchStart, { passive: true })
        window.addEventListener("touchmove", this.onTouchMove, { passive: true })
        window.addEventListener("touchend", this.onTouchEnd, { passive: true })
    }

    public onWheel(): void {
        if (this.autoScroll) {
            this.autoScroll.kill()
            this.autoScroll = null
        }
        // console.log('ON_WHEEL')
        this.isPlaying = false
        this.updateButton()
    }

    private onStop(): void {
        // if (this.autoScroll && this.isPlaying) {
        //     this.autoScroll.resume()
        // } else if (this.isPlaying) {
        //     this.play()
        // }
        // console.log('ON_STOP')
        // this.updateButton()
    }

    private play(keyboard: boolean = false): void {
        if (!this.autoScroll) {
            this.initAutoScroll()
        } else {
            this.autoScroll.resume()
        }
        this.isPlaying = true
        this.updateButton()
        window.umami.track('Animation', { type: 'play' })
        if (!keyboard) Utils.dataSet(".cursor", { text: 'pause' })
    }

    private pause(keyboard: boolean = false): void {
        if (this.autoScroll) {
            this.autoScroll.pause()
        }
        this.isPlaying = false
        this.updateButton()
        window.umami.track('Animation', { type: 'pause' })
        if (!keyboard) Utils.dataSet(".cursor", { text: 'play' })
    }

    private updateButton() {
        Utils.toggleClass(this.button, 'scrolling', this.isPlaying)
        Utils.dataSet(this.button, { cursor: this.isPlaying ? 'pause' : 'play' })
    }

    public destroy(): void {
        if (this.autoScroll) {
            this.autoScroll.kill()
            this.autoScroll = null
        }

        if (this.scrollTrigger) {
            this.scrollTrigger.kill()
            this.scrollTrigger = null
        }
    }

    private onTouchStart(event: TouchEvent): void {
        this.touchStartY = event.touches[0].clientY
    }

    private onTouchMove(event: TouchEvent): void {
        const currentY = event.touches[0].clientY
        const deltaY = Math.abs(this.touchStartY - currentY)
        if (deltaY > 2) this.onWheel()
    }

    private onTouchEnd(): void {
        // console.log('TOUCH_END')
    }
}