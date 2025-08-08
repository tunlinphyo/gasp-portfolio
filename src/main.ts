import './style.css'

window.addEventListener('DOMContentLoaded', () => {
    main().catch(err => {
        console.error(err)
    })
})

async function main() {
    const [{ UmamiAnalytics }, { ReducedMotionListener }] = await Promise.all([
        import("./scripts/umami"),
        import("./scripts/reduce-motion")
    ])
    new UmamiAnalytics(import.meta.env.VITE_UMAMI_ANALYTICS, import.meta.env.VITE_UMAMI_SITE_ID)

    const motion = new ReducedMotionListener()
    motion.listen((isReduced) => {
        window.umami?.track?.('Motion', { value: isReduced })
        window.location.reload()
    })

    if (ReducedMotionListener.isReduced()) {
        const { Utils } = await import('./scripts/utils')
        await Utils.wait(1000)

        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
        ])
        gsap.registerPlugin(ScrollTrigger)

        const [{ App }, { LogoRotator }, { Projects }] = await Promise.all([
            import("./scripts"),
            import("./scripts/logo"),
            import("./scripts/projects"),
        ])
        new LogoRotator("body")
        new Projects()
        App.noMotionHandle()
        return
    }

    const { PageLoading } = await import('./scripts/loading')
    const loading = new PageLoading()
    await loading.init()

    const [{ gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollToPlugin"),
    ])
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const [{ ThemeManager }, { Carousel }, { Timeline }] = await Promise.all([
        import("./scripts/theme"),
        import("./scripts/carousel"),
        import("./scripts/timeline"),
    ])

    const theme = new ThemeManager()
    const carousel = new Carousel('.carousel')
    new Timeline(theme, carousel)

    loading.hide()

    const [{ Cursor }, { LogoRotator }, { Toast }, { Projects }, { AutoScroller }, { KeyboardHandler }, { loadGoogleFont }] =
        await Promise.all([
            import("./scripts/cursor"),
            import("./scripts/logo"),
            import("./scripts/toast"),
            import("./scripts/projects"),
            import("./scripts/scroll"),
            import("./scripts/keyboard"),
            import("./scripts/fonts"),
        ])

        // import { loadGoogleFont } from './scripts/fonts'

    new Cursor()
    new LogoRotator(".scroll-trigger")

    await loadGoogleFont('Orbitron', '800');

    const projects = new Projects()
    const toast = new Toast()
    const scroll = new AutoScroller()
    new KeyboardHandler(projects, scroll, toast)

    const { App } = await import("./scripts")
    App.trackLinksClick()
    App.trackContactClick()
    App.animateHoverElemets()

    const { BrowserCheck } = await import("./scripts/browser")

    BrowserCheck.runIfComputerBrowser(async () => {
        const [{ Utils }, { JapanSeason, Season }, { default: p5 }] = await Promise.all([
            import('./scripts/utils'),
            import("./scripts/season"),
            import("p5"),
        ])

        await Utils.wait(1000)

        const season = JapanSeason.getCurrentSeason()
        const mainEl = Utils.elem('.page-main')

        switch (season) {
            case Season.SPRING:
                document.body.classList.add('spring')
                const { sakuraSketch } = await import("./scripts/p5/sakura")
                new p5(sakuraSketch, mainEl)
                break
            case Season.SUMMER:
                document.body.classList.add('summer')
                const { fireworkSketch } = await import("./scripts/p5/firework")
                new p5(fireworkSketch, mainEl)
                break
            case Season.AUTUMN:
                document.body.classList.add('autumn')
                const { fallSketch } = await import("./scripts/p5/fall")
                new p5(fallSketch, mainEl)
                break
            case Season.WINTER:
                document.body.classList.add('winter')
                const { snowSketch } = await import("./scripts/p5/snow")
                new p5(snowSketch, mainEl)
                break
            default:
                break
        }
    })
}
