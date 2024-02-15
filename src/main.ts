import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import './style.css'
import { loading } from "./scripts/loading"
import { initCarousel } from "./scripts/carousel"
import { rotateLogo } from "./scripts/logo"
import { animator } from './scripts/timeline'
import { initCursor } from "./scripts/cursor"
import Projects from "./scripts/projects"

gsap.registerPlugin(ScrollTrigger)

window.onload = async () => {
    await loading()
    initCursor()
    const carousel = initCarousel()
    rotateLogo()
    animator(carousel)
    new Projects()
}
