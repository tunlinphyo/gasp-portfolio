import './style.css'

import { PageLoading } from "./scripts/loading"
import { ReducedMotionListener } from "./scripts/reduce-motion"

window.onload = async () => {
    const motion = new ReducedMotionListener()
    motion.listen(async (isReduced) => {
        window.umami.track('Motion', { value: isReduced })
        window.location.reload()
    })

    const { UmamiAnalytics } = await import("./scripts/umami")
    new UmamiAnalytics(import.meta.env.VITE_UMAMI_ANALYTICS, import.meta.env.VITE_UMAMI_SITE_ID)

    if (ReducedMotionListener.isReduced()) {
        const { Utils } = await import('./scripts/utils')
        const { LogoRotator } = await import("./scripts/logo")

        await Utils.wait(1000)
        new LogoRotator("body")

        const { App } = await import("./scripts")
        const { Projects } = await import("./scripts/projects")

        App.noMotionHandle()
        new Projects()
        return
    }

    const loading = new PageLoading()
    await loading.init()

    const { default: gsap } = await import("gsap")
    const { default: ScrollTrigger } = await import("gsap/ScrollTrigger")
    const { default: ScrollToPlugin } = await import("gsap/ScrollToPlugin")
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const { ThemeManager } = await import("./scripts/theme")
    const { Carousel } = await import("./scripts/carousel")
    const { Timeline } = await import("./scripts/timeline")

    const theme = new ThemeManager()
    const carousel = new Carousel('.carousel')
    new Timeline(theme, carousel)

    loading.hide()

    const { Cursor } = await import("./scripts/cursor")
    const { LogoRotator } = await import("./scripts/logo")

    new Cursor()
    new LogoRotator(".scroll-trigger")

    const { Toast } = await import("./scripts/toast")
    const { Projects } = await import("./scripts/projects")
    const { AutoScroller } = await import("./scripts/scroll")
    const { KeyboardHandler } = await import("./scripts/keyboard")

    const projects = new Projects()
    const toast = new Toast()
    const scroll = new AutoScroller()
    new KeyboardHandler(projects, scroll, toast)

    const { App } = await import("./scripts")

    App.trackLinksClick()
    App.trackContactClick()
    App.animateHoverElemets()

    const { Utils } = await import('./scripts/utils')
    const { BrowserCheck } = await import("./scripts/browser")

    window.firework = false

    BrowserCheck.runIfComputerBrowser(async () => {
        const { JapanSeason, Season } = await import("./scripts/season")
        const { fallSketch, fireworkSketch, sakuraSketch, snowSketch } = await import("./scripts/p5")
        const p5 = (await import("p5")).default

        await Utils.wait(1000)

        const season = JapanSeason.getCurrentSeason()
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