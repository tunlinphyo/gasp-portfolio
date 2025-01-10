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
import { wait } from "./scripts/helpers/utils"
import { BrowserCheck } from "./scripts/helpers/browser"
import { JapanSeason, Season } from "./scripts/helpers/season"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

window.onload = async () => {
    await loading()
    initCursor()
    const carousel = initCarousel()
    rotateLogo()
    animator(carousel)
    new Projects()
    new AutoScroller()

    BrowserCheck.runIfComputerBrowser(async () => {
        await wait(1000)

        const season = JapanSeason.getCurrentSeason()

        switch(season) {
            case Season.SPRING:
                document.body.classList.add('spring')
                new p5(sakuraSketch)
                break
            case Season.SUMMER:
                document.body.classList.add('summer')
                new p5(fireworkSketch)
                break
            case Season.AUTUMN:
                document.body.classList.add('autumn')
                new p5(fallSketch)
                break
            case Season.WINTER:
                document.body.classList.add('winter')
                new p5(snowSketch)
                break
            default:
                break
        }

    })
}
