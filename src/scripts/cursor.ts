import gsap from "gsap"
import { dataSet, elem, hasClass, toggleClass } from "./helpers/utils"

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

        toggleClass(".cursor", "active", has)

        if (has) {
            const data = elem(e.target as HTMLElement).dataset.cursor
            dataSet(".cursor", { text: data || "" })
        } else {
            dataSet(".cursor", { text: "" })
        }
    })
}