import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import './style.css'
import { loading } from "./scripts/loading"
import { initCarousel } from "./scripts/carousel"
import { rotateLogo } from "./scripts/logo"
import { animator } from './scripts/timeline'
import { initCursor } from "./scripts/cursor"
import Projects from "./scripts/projects"
import { elem } from "./scripts/helpers/utils"
import { SmoothScroller } from "./scripts/helpers/scroll"

gsap.registerPlugin(ScrollTrigger)

window.onload = async () => {
    await loading()
    initCursor()
    const carousel = initCarousel()
    rotateLogo()
    animator(carousel)
    new Projects()

    const playButton = elem('.playPause')
    const scroller = new SmoothScroller(27000, () => {
        playButton.classList.remove('scrolling')
        playButton.dataset.cursor = 'play'
    })

    playButton.addEventListener('click', () => {
        playButton.setAttribute('disabled', 'disabled')
        const timeout = setTimeout(() => {
            clearTimeout(timeout)
            playButton.removeAttribute('disabled')
        }, 1000)
        if (playButton.classList.contains('scrolling')) {
            playButton.classList.remove('scrolling')
            playButton.dataset.cursor = 'play'
            scroller.pause()
        } else {
            playButton.classList.add('scrolling')
            playButton.dataset.cursor = 'pause'
            scroller.play()
        }
    })
}
