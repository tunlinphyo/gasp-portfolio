import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"

import { animator } from './scripts/timeline'
import './style.css'
import Projects from "./scripts/projects"
import { loading } from "./scripts/loading"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

window.onload = async () => {
    await loading()
    animator()
    new Projects()
}
