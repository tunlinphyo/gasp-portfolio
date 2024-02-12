import gsap from "gsap"
import { applyStyles, elem } from "./helpers/utils"
import disabledScroll from "./helpers/disabled-scroll"

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
            disabledScroll.off()
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
    window.scrollTo(0, 0)
    disabledScroll.on()

    return new Promise((resolve) => {
        setTimeout(() => {
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
                    applyStyles(".section--fixed", { zIndex: 1 })
                    hideTimeline.kill()
                }
            })
        }, 3000)
    })
}