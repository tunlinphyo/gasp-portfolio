import gsap from "gsap"
import { elem } from "./helpers/utils"

export function loading() {
    const animatorOne = elem(".animator--one")

    const loadingTimeline = gsap.timeline({
        repeat: -1,
        paused: true,
    })

    const helloEnter = gsap.from(".hello-message", {
        opacity: 0,
        scale: 0,
        ease: "elastic.out(1, 0.2)",
        duration: 1.5,
        paused: true,
        onComplete: () => {
            helloEnter.kill()
        }
    })
    const mouseEnter = gsap.to(".mouse", { 
        y: 0, 
        opacity: 1, 
        ease: 'back.out',
        duration: 1,
        paused: true,
        onComplete: () => {
            mouseEnter.kill()
        }
    })

    loadingTimeline.to(animatorOne, {
        width: "80vw",
        duration: 1,
    })
    .to(animatorOne, {
        width: 2,
        duration: 1,
    })

    loadingTimeline.play()

    return new Promise((resolve) => {
        setTimeout(() => {
            window.scrollTo(0, 0)

            loadingTimeline.kill()
    
            const hideTimeline = gsap.timeline()

            hideTimeline.to(animatorOne, {
                width: 2,
                duration: 1,
            })
            .to(".animator-container", {
                x: 0,
                y: "-25vh",
                onComplete: () => {
                    if (window.scrollY < 10) {
                        helloEnter.play()
                        mouseEnter.play()
                    }
                    resolve(true)
                }
            })
            .to(".section--loading", {
                opacity: 0,
                onComplete: () => {
                    hideTimeline.kill()
                }
            })
        }, 3000)
    })
}