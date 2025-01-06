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
import { fallSketch, snowSketch } from "./scripts/p5"
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

        const jSeason = new JapanSeason()
        const season = jSeason.getCurrentSeason()

        switch(season) {
            case Season.SPRING:
                break
            case Season.SUMMER:
                break
            case Season.AUTUMN:
                new p5(fallSketch)
                break
            case Season.WINTER:
                new p5(snowSketch)
                break
            default:
                break
        }

    })
}
