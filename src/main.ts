import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"

import './style.css'
import { Timeline } from "./scripts/timeline"
import { PageLoading } from "./scripts/loading"
import { ThemeManager } from "./scripts/theme"
import { Carousel } from "./scripts/carousel"
import { AutoScroller } from "./scripts/scroll"
import { Projects } from "./scripts/projects"
import { Toast } from "./scripts/toast"
import { KeyboardHandler } from "./scripts/keyboard"
import { Cursor } from "./scripts/cursor"
import { App } from "./scripts"
import { UmamiAnalytics } from "./scripts/umami"
import { LogoRotator } from "./scripts/logo"
import { ReducedMotionListener } from "./scripts/reduce-motion"
import { BrowserCheck } from "./scripts/browser"
import { Utils } from './scripts/utils'
import p5 from "p5"
import { JapanSeason, Season } from "./scripts/season"
import { fallSketch, fireworkSketch, sakuraSketch, snowSketch } from "./scripts/p5"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

window.onload = async () => {
    new UmamiAnalytics(import.meta.env.VITE_UMAMI_ANALYTICS, import.meta.env.VITE_UMAMI_SITE_ID)

    const motion = new ReducedMotionListener()
    motion.listen(async (isReduced) => {
        window.umami.track('Motion', { value: isReduced })
        window.location.reload()
    })

    if (ReducedMotionListener.isReduced()) {
        await Utils.wait(1000)
        new LogoRotator("body")
        App.noMotionHandle()
        new Projects()

        return
    }

    const loading = new PageLoading()
    await loading.init()
    new Cursor()
    new LogoRotator(".scroll-trigger")

    const theme = new ThemeManager()
    const carousel = new Carousel('.carousel')
    new Timeline(theme, carousel)
    const toast = new Toast()
    const projects = new Projects()
    const scroll = new AutoScroller()
    new KeyboardHandler(projects, scroll, toast)

    App.trackLinksClick()
    App.trackContactClick()
    App.animateHoverElemets()

    window.firework = false

    BrowserCheck.runIfComputerBrowser(async () => {
        await Utils.wait(1000)

        const season = Season.SUMMER // JapanSeason.getCurrentSeason()
        const mainEl = Utils.elem('.page-main')

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
