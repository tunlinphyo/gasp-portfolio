import gsap from "gsap"
import { dataSet, elem, hasClass, hasCursorNoneAncestor, toggleClass } from "./helpers/utils"

export function initCursor() {
    let isMouse = false

    window.addEventListener('pointermove', (event: PointerEvent) => {
        if (event.pointerType === 'mouse')  isMouse = true
        else isMouse = false
    })

    window.addEventListener('mousemove', (e: MouseEvent) => {
        if (!isMouse) return

        gsap.to(".cursor", {
            x: e.clientX,
            y: e.clientY
        })

        const has = hasClass(e.target as HTMLElement, "cursor--link")
        const hover = hasClass(e.target as HTMLElement, "cursor--hover")
        const logo = hasClass(e.target as HTMLElement, "logo-container")
        const animator = hasClass(e.target as HTMLElement, "animator")
        const none = hasCursorNoneAncestor(e.target)

        toggleClass(".cursor", "active", has)
        toggleClass(".cursor", "hover", hover)
        toggleClass(".cursor", "none", none)
        toggleClass(".cursor", "animator", animator)

        if (has) {
            const data = elem(e.target as HTMLElement).dataset.cursor
            dataSet(".cursor", { text: data || "" })
        } else {
            dataSet(".cursor", { text: "" })
        }

        if (logo) {
            const x = e.clientX - (window.innerWidth * 0.5)
            const y = e.clientY
            gsap.to('.logo-container', { x, y })
        } else {
            gsap.to('.logo-container', { x: 0, y: 0, duration: .6 })
        }
    })
}