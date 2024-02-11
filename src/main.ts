import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"

import { animator } from './scripts/timeline'
import './style.css'
import Projects from "./scripts/projects"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

window.onload = () => {
    animator()
    new Projects()
}
