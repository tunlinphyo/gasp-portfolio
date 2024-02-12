import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { animator } from './scripts/timeline'
import './style.css'
import Projects from "./scripts/projects"
import { loading } from "./scripts/loading"

gsap.registerPlugin(ScrollTrigger)

window.onload = async () => {
    await loading()
    animator()
    new Projects()
}
