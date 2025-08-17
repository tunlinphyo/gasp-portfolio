export class LogoRotator {
    private timeline: GSAPTimeline

    constructor(trigger: string, private gsap: any) {
        this.timeline = this.gsap.timeline({
            scrollTrigger: {
                trigger,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        })
        this.rotate()
    }

    rotate() {
        this.timeline.to(".logo-container", {
            rotate: 360 * -2,
            ease: "none"
        })
    }
}
