import gsap from "gsap"
import { Utils } from './utils'

export class Cursor {
    private isMouse: boolean

    constructor() {
        this.isMouse = false
        this.init()
    }

    init() {
        window.addEventListener('pointermove', (event) => {
            this.isMouse = event.pointerType === 'mouse'
        })

        window.addEventListener('mousemove', (e) => this.handleMouseMove(e))
    }

    handleMouseMove(e: MouseEvent) {
        if (!this.isMouse) return

        gsap.to(".cursor", {
            x: e.clientX,
            y: e.clientY
        })

        const has = Utils.hasClass(e.target as HTMLElement, "cursor--link")
        const hover = Utils.hasClass(e.target as HTMLElement, "cursor--hover")
        const logo = Utils.hasClass(e.target as HTMLElement, "logo-container")
        const animator = Utils.hasClass(e.target as HTMLElement, "animator")
        const none = Utils.hasCursorNoneAncestor(e.target)

        Utils.toggleClass(".cursor", "active", has)
        Utils.toggleClass(".cursor", "hover", hover)
        Utils.toggleClass(".cursor", "none", none)
        Utils.toggleClass(".cursor", "animator", animator)

        if (has) {
            const data = Utils.elem(e.target as HTMLElement).dataset.cursor
            Utils.dataSet(".cursor", { text: data || "" })
        } else {
            Utils.dataSet(".cursor", { text: "" })
        }

        if (logo) {
            const x = e.clientX - (window.innerWidth * 0.5)
            const y = e.clientY
            gsap.to('.logo-container', { x, y })
        } else {
            gsap.to('.logo-container', { x: 0, y: 0, duration: 0.6 })
        }
    }
}