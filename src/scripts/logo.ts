import gsap from "gsap"

export function rotateLogo() {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-trigger",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    })

    timeline.to(".logo-container", {
        rotate: 360 * -2,
        ease: "none"
    })
}