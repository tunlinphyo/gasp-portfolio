import gsap from "gsap"
// import { Utils } from './utils'
import disabledScroll from "./disabled-scroll"
import { Utils } from "./utils"

export class PageLoading {
    private loadingTimeline: GSAPTimeline
    private helloEnter: GSAPTween
    private mouseEnter: GSAPTween
    private circleEnter: GSAPTween
    private playEnter: GSAPTween

    constructor() {
        this.loadingTimeline = gsap.timeline({
            repeat: -1,
            paused: true,
        })

        this.helloEnter = gsap.from(".intro-heading", {
            opacity: 0,
            scale: 0,
            ease: "elastic.out",
            duration: 1.5,
            paused: true,
            onComplete: () => {
                disabledScroll.off()
                this.helloEnter.kill()
                Utils.addClass('.intro-heading', 'with-animation')
            }
        })

        this.mouseEnter = gsap.to(".mouse", {
            y: 0,
            opacity: 1,
            ease: 'back.out',
            duration: 1,
            paused: true,
            onComplete: () => {
                this.mouseEnter.kill()
            }
        })

        this.circleEnter = gsap.to(".bg", {
            scale: 1,
            ease: 'power1.out',
            stagger: 0.05,
            paused: true,
            onComplete: () => {
                this.circleEnter.kill()
            }
        })

        this.playEnter = gsap.to(".playPause", {
            scale: 1,
            opacity: 1,
            ease: 'elastic.out',
            duration: 1,
            // delay: 1,
            paused: true,
            onComplete: () => {
                this.playEnter.kill()
            }
        })

    }

    async init() {
        this.loadingTimeline.to('.animator--one', {
            "--width": "80vw",
            duration: 1,
        })
        .to('.animator--one', {
            "--width": '2px',
            duration: 1,
        })

        this.loadingTimeline.play()
        window.scrollTo(0, 0)
        disabledScroll.on()

        return new Promise((resolve) => {
            setTimeout(() => {
                this.loadingTimeline.kill()

                const hideTimeline = gsap.timeline()

                hideTimeline.to('.animator--one', {
                    "--width": '2px',
                    duration: 1,
                })
                .to(".animator-container", {
                    x: 0,
                    y: "-25vh",
                    duration: 0.25,
                })
                .to('.animator--two', {
                    "--height": "25vh",
                    y: "12.5vh",
                    duration: 0.25,
                }, "<")
                .to(['.animator--three', '.animator--four'], {
                    rotate: 45,
                    duration: 0,
                })
                .to(['.animator--one', '.animator--three'], {
                    "--width": "14px",
                })
                .to(['.animator--two', '.animator--four'], {
                    "--height": "14px",
                    y: 0,
                    onComplete: () => {
                        if (window.scrollY < 10) {
                            this.helloEnter.play()
                            this.mouseEnter.play()
                            this.playEnter.play()
                            this.circleEnter.play()
                        }
                        resolve(true)
                    }
                }, "<")
                .to(".page-loading", {
                    opacity: 0,
                    onComplete: () => {
                        // Utils.applyStyles(".section--fixed", { zIndex: 2 })
                        hideTimeline.kill()
                    }
                })
            }, 1000)
        })
    }

}