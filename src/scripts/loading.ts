import gsap from "gsap"
// import { Utils } from './utils'
import disabledScroll from "./disabled-scroll"

export class PageLoading {
    private loadingTimeline: GSAPTimeline
    private helloEnter: GSAPTween
    private mouseEnter: GSAPTween
    private circleEnter: GSAPTween
    private playEnter: GSAPTween
    private loop?: GSAPTimeline

    private loadingFinished: Boolean = false
    private dataLoaded: Boolean = false

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
        this.loadingTimeline
        .to('.animator--one', {
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

        return new Promise(resolve => {
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
                    onComplete: () => {
                        resolve(true)
                    }
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
                    "--width": "16px",
                })
                .to(['.animator--two', '.animator--four'], {
                    "--height": "16px",
                    y: 0,
                    onComplete: () => {
                        hideTimeline.kill()
                        this.loadingFinished = true
                        if (this.dataLoaded)
                            this.hide()
                        else
                            this.infiniteLoop()
                    }
                }, "<")
            }, 1000)
        })
    }

    infiniteLoop() {
        this.loop = gsap.timeline({
            repeat: -1,
            defaults: { duration: 0.5, ease: "power1.inOut" },
            repeatRefresh: true,
        })
            .to(['.animator--one', '.animator--three'], {
                "--width": "16px",
            })
            .to(['.animator--two', '.animator--four'], {
                "--height": "16px",
            }, "<")
            .to(['.animator--one', '.animator--three'], {
                "--width": "2px",
            })
            .to(['.animator--two', '.animator--four'], {
                "--height": "2px",
            }, "<")
            .to(['.animator--one', '.animator--three'], {
                "--width": "16px",
            })
            .to(['.animator--two', '.animator--four'], {
                "--height": "16px",
            }, "<")
    }

    killLoop() {
        this.loop?.to(['.animator--one', '.animator--three'], {
                "--width": "16px",
            })
            .to(['.animator--two', '.animator--four'], {
                "--height": "16px",
                onComplete: () => {
                    this.loop?.kill()
                }
            }, "<")
    }

    hide() {
        this.dataLoaded = true
        if (!this.loadingFinished) return
        gsap.to(".page-loading", {
            opacity: 0,
            onStart: () => {
                this.killLoop()
                if (window.scrollY < 10) {
                    this.helloEnter.play()
                    this.mouseEnter.play()
                    this.playEnter.play()
                    this.circleEnter.play()
                }
            }
        })
    }

    enter() {
        if (window.scrollY < 10) {
            this.helloEnter.play()
            this.mouseEnter.play()
            this.playEnter.play()
            this.circleEnter.play()
        }
    }
}