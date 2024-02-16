import gsap from "gsap"
import { dataSet, elem, hasClass, supportsTouch, toggleClass } from "./helpers/utils"

export function initCursor() {
    if (supportsTouch()) return

    window.addEventListener('mousemove', (e: MouseEvent) => {
        gsap.to(".cursor", {
            x: e.clientX,
            y: e.clientY
        })

        const has = hasClass(e.target as HTMLElement, "cursor--link")

        toggleClass(".cursor", "active", has)

        if (has) {
            const data = elem(e.target as HTMLElement).dataset.cursor
            dataSet(".cursor", { text: data || "" })
        } else {
            dataSet(".cursor", { text: "" })
        }
    })
}