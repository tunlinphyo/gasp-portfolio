import gsap from "gsap"
import { applyStyles, elems } from "./helpers/utils"

export function initCarousel() {
    const carousels = elems(".carousel-item")
    const lefts: number[] = []
    let tempLeft = 0

    applyStyles(".carousel", { left: `${carousels[0].clientWidth * -1}px`})

    Array.from(carousels).forEach((item) => {
        const width = item.clientWidth
        lefts.push(tempLeft)
        tempLeft += width
    })

    gsap.set(".carousel-item", {
        x: (i) => lefts[i]
    })

    const animation = gsap.from(".carousel-item", {
        duration: 30,
        ease: "none",
        x: `+=${tempLeft}`,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % tempLeft)
        },
        repeat: -1,
        paused: true,
    })

    return animation
}
