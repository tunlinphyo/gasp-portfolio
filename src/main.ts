import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"

import './style.css'
import { loading } from "./scripts/loading"
import { initCarousel } from "./scripts/carousel"
import { rotateLogo } from "./scripts/logo"
import { animator } from './scripts/timeline'
import { initCursor } from "./scripts/cursor"
import { Projects } from "./scripts/projects"
import { AutoScroller } from "./scripts/scroll"
import p5 from "p5"
import { fallSketch, fireworkSketch, sakuraSketch, snowSketch } from "./scripts/p5"
import { elem, wait } from "./scripts/helpers/utils"
import { BrowserCheck } from "./scripts/helpers/browser"
import { JapanSeason, Season } from "./scripts/helpers/season"
import { Utils } from "./scripts/utils"
import { UmamiAnalytics } from "./scripts/umami"
import { KeyboardHandler } from "./scripts/keyboard"
import { Toast } from "./scripts/toast"
import { ReducedMotionListener } from "./scripts/reduce-motion"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

window.onload = async () => {
    new UmamiAnalytics(import.meta.env.VITE_UMAMI_ANALYTICS, import.meta.env.VITE_UMAMI_SITE_ID)

    const motion = new ReducedMotionListener()
    motion.listen(async (isReduced) => {
        window.umami.track('Motion', { value: isReduced })
        window.location.reload()
    })

    if (ReducedMotionListener.isReduced()) return

    await loading()
    initCursor()
    const toast = new Toast()
    const carousel = initCarousel()
    rotateLogo()
    animator(carousel)
    const project = new Projects()
    const scroll = new AutoScroller()
    new KeyboardHandler(project, scroll, toast)

    Utils.trackLinksClick()
    Utils.trackContactClick()
    Utils.animateHoverElemets()

    window.firework = false

    BrowserCheck.runIfComputerBrowser(async () => {
        await wait(1000)

        const season = JapanSeason.getCurrentSeason()
        const mainEl = elem('.main')

        switch (season) {
            case Season.SPRING:
                document.body.classList.add('spring')
                new p5(sakuraSketch, mainEl)
                break
            case Season.SUMMER:
                document.body.classList.add('summer')
                new p5(fireworkSketch, mainEl)
                break
            case Season.AUTUMN:
                document.body.classList.add('autumn')
                new p5(fallSketch, mainEl)
                break
            case Season.WINTER:
                document.body.classList.add('winter')
                new p5(snowSketch, mainEl)
                break
            default:
                break
        }
    })
}
