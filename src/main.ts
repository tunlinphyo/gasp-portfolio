import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { animator } from './scripts/timeline'
import './style.css'
import Projects from "./scripts/projects"
import { loading } from "./scripts/loading"
import { initCarousel } from "./scripts/carousel"

gsap.registerPlugin(ScrollTrigger)

window.onload = async () => {
    await loading()
    const carousel = initCarousel()
    animator(carousel)
    new Projects()
}
