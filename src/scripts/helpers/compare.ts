export class SmoothScroller {
    private start: number
    private end: number
    private distance: number
    private startTime: number | null = null
    private paused: boolean = false
    private pausedTime: number | null = null
    private baseSpeed: number
    private currentSpeed: number
    private animationFrameId: number | null = null
    private userScrolled: boolean = false
    private isProgrammaticScroll: boolean = false
    private onEnd: (() => void) | null = null

    constructor(speed: number, onEnd?: () => void) {
        this.baseSpeed = speed
        this.currentSpeed = speed
        this.start = window.scrollY || window.pageYOffset
        this.end = document.body.scrollHeight - window.innerHeight
        this.distance = this.end - this.start
        this.onEnd = onEnd || null
        this.handleUserScroll = this.handleUserScroll.bind(this)
        window.addEventListener('scroll', this.handleUserScroll)
    }

    private calculateSpeed() {
        const fullDistance = document.body.scrollHeight - window.innerHeight
        const remainingDistance = this.end - this.start
        const speedFactor = remainingDistance / fullDistance
        this.currentSpeed = Math.max(this.baseSpeed * speedFactor, 300)
    }

    private scrollStep = (timestamp: number) => {
        this.isProgrammaticScroll = true

        if (this.paused) {
            this.pausedTime = timestamp
            this.isProgrammaticScroll = false
            return
        }

        if (!this.startTime) this.startTime = timestamp
        if (this.pausedTime) {
            this.startTime += timestamp - this.pausedTime
            this.pausedTime = null
        }

        if (this.userScrolled) {
            this.start = window.scrollY || window.pageYOffset
            this.end = document.body.scrollHeight - window.innerHeight
            this.distance = this.end - this.start
            this.calculateSpeed()
            this.userScrolled = false
            this.startTime = timestamp
        }

        const progress = timestamp - this.startTime
        const percentage = Math.min(progress / this.currentSpeed, 1)

        window.scrollTo(0, this.start + this.distance * percentage)

        if (percentage < 1) {
            this.animationFrameId = requestAnimationFrame(this.scrollStep)
        } else {
            this.startTime = null
            this.animationFrameId = null
            this.isProgrammaticScroll = false
            if (this.onEnd) this.onEnd()
        }

        setTimeout(() => (this.isProgrammaticScroll = false), 50)
    }

    private handleUserScroll() {
        if (this.isProgrammaticScroll) return
        this.userScrolled = true
    }

    public isUserScrolling(): boolean {
        return this.userScrolled && !this.isProgrammaticScroll
    }

    public isJsScrolling(): boolean {
        return this.isProgrammaticScroll
    }

    public startScroll() {
        this.start = window.scrollY || window.pageYOffset
        this.end = document.body.scrollHeight - window.innerHeight
        this.distance = this.end - this.start
        this.calculateSpeed()
        this.animationFrameId = requestAnimationFrame(this.scrollStep)
    }

    public play() {
        if (!this.animationFrameId) {
            this.startScroll()
        } else {
            this.resume()
        }
    }

    public pause() {
        this.paused = true
    }

    public resume() {
        if (this.paused) {
            this.paused = false
            this.start = window.scrollY || window.pageYOffset
            this.end = document.body.scrollHeight - window.innerHeight
            this.distance = this.end - this.start
            this.calculateSpeed()
            this.animationFrameId = requestAnimationFrame(this.scrollStep)
        }
    }

    public stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
        window.removeEventListener('scroll', this.handleUserScroll)
    }
}