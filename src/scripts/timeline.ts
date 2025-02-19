import gsap from "gsap"
import SplitType from "split-type"
import { Utils } from "./utils"
import { ThemeManager } from "./theme"
import { Carousel } from "./carousel"

export class Timeline {
    private timeline: GSAPTimeline
    private aboutHeading: SplitType
    private aboutMessage: SplitType
    private techIntroHeading: SplitType
    private languagesHeading: SplitType
    private frameworksHeading: SplitType
    private databasesHeading: SplitType
    private othersHeading: SplitType
    private projectIntroMessage: SplitType
    private contactHeading: SplitType

    private controlBtns: NodeListOf<HTMLButtonElement>

    constructor(
        private theme: ThemeManager,
        private carousel: Carousel
    ) {
        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-trigger",
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
                // markers: true,
            }
        })
        this.aboutHeading = new SplitType(".about-heading", { types: 'chars' })
        this.aboutMessage = new SplitType(".about-message", { types: 'words,chars' })
        this.techIntroHeading = new SplitType(".techIntro-heading", { types: 'chars' })
        this.languagesHeading = new SplitType(".languages-heading", { types: 'chars' })
        this.frameworksHeading = new SplitType(".frameworks-heading", { types: 'chars' })
        this.databasesHeading = new SplitType(".databases-heading", { types: 'chars' })
        this.othersHeading = new SplitType(".others-heading", { types: 'chars' })
        this.projectIntroMessage = new SplitType(".projectIntro-message", { types: 'lines' })
        this.contactHeading = new SplitType(".contact-heading", { types: 'chars' })
        this.controlBtns = Utils.elems<HTMLButtonElement>(".control")

        this.timelineListener()
    }

    private timelineListener() {
        this.introTrigger()
        this.animatorTrigger()
        this.aboutTrigger()
        this.techTrigger()
        this.techListTrigger()
        this.projectIntroTrigger()
        this.projectTrigger()
        this.animatorLastTrigger()
        this.contactTrigger()
        this.backgroundTimeline()
    }

    private introTrigger() {
        this.timeline
        .add("timelineStart")
        .fromTo(".intro-heading", { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.25 })
        .fromTo(".mouse", { y: 0, opacity: 1 }, { y: 200, opacity: 0 }, "<")
        .to('.open-shortcuts', { scale: 0 }, "<")
        .add("introHide")
    }

    private aboutTrigger() {
        this.timeline
        .to(this.aboutHeading.chars, { scale: 1, opacity: 1, ease: "back.out(1)", stagger: 0.02 }, "introHide")
        .to(this.aboutMessage.chars, { scale: 1, opacity: 1, ease: "back.out(1)", stagger: 0.01 }, "<")
        .add("aboutShow")
        .to(this.aboutHeading.chars, { transformOrigin: "top center", scale: 4, opacity: 0 }, "anmiGrowStart")
        .to(".about-message", { scale: 0, opacity: 0 }, "<")
        .add("aboutHide")
        .to(null, {
            duration: 0,
            onComplete: () => {
                console.log('ON_SET_LIGHT')
                this.theme.setLight()
            },
            onReverseComplete: () => {
                console.log('REV_REMOVE_LIGHT')
                this.theme.removeLight()
            }
        }, "introHide")
    }

    private techTrigger() {
        this.timeline
        .from(this.techIntroHeading.chars, {
            scale: 0,
            opacity: 0,
            y: -100,
            rotate: -90,
            stagger: {
                each: 0.01,
                from: "center",
            },
            duration: 1.5,
            ease: "elastic.out(1, 0.1)",
        }, "anmiGrowEnd")
        .from('.techIntro-list > li', { x: 200, opacity: 0, stagger: 0.2 }, ">-0.5")
        .add("techShow")
        .to('.techIntro-list > li', { x: -200, opacity: 0 }, "anmiRightGrowStart")
        .to(this.techIntroHeading.chars, {
            scale: 0,
            opacity: 0,
            y: -100,
            rotate: -90,
            stagger: {
                each: 0.01,
                from: "center",
            },
            duration: 1.5,
            ease: "elastic.in(1, 0.1)",
        }, ">")
        .add("techHide")
    }

    private techListTrigger() {
        this.timeline
        .from(this.languagesHeading.chars, {
            scale: 0,
            opacity: 0,
            y: 50,
            stagger: {
                each: 0.01,
                from: "center",
            },
            duration: 0.7,
            ease: "bounce.out",
            delay: 0.5,
            onStart: () => {
                window.umami.track('Scroll', { position: 'Technical' })
            },
        }, "lineMaxStart")
        .from(".languages-group ol", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")

        .from(this.frameworksHeading.chars, {
            scale: 0,
            opacity: 0,
            y: 50,
            stagger: {
                each: 0.01,
                from: "center",
            },
            duration: 0.7,
            ease: "bounce.out",
            delay: 0.5
        }, "lineMaxStart")
        .from(".frameworks-group ol", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")
        .add('techListFirstShow')

        .to(this.languagesHeading.chars, { scale: 0.5, opacity: 0, y: -100, delay: 0.5 }, "lineMaxSecondStart")
        .to(".languages-group ol", { opacity: 0, y: -100, pointerEvents: 'none' }, "<")


        .to(this.frameworksHeading.chars, { scale: 0.5, opacity: 0, y: -100, delay: 0.5 }, "lineMaxSecondStart")
        .to(".frameworks-group ol", { opacity: 0, y: -100, pointerEvents: 'none' }, "<")
        .add('techListFirstHide')

        .from(this.databasesHeading.chars, {
            scale: 0,
            opacity: 0,
            y: 50,
            stagger: {
                each: 0.01,
                from: "center",
            },
            duration: 0.7,
            ease: "bounce.out",
        }, "lineMaxSecondEnd")
        .from(".databases-group ol", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")

        .from(this.othersHeading.chars, {
            scale: 0,
            opacity: 0,
            y: 50,
            stagger: {
                each: 0.01,
                from: "center",
            },
            duration: 0.7,
            ease: "bounce.out",
        }, "lineMaxSecondEnd")
        .from(".others-group ol", { opacity: 0,  y: 100, pointerEvents: 'none' }, "<")
        .add('techListSecondShow')

        .to(this.databasesHeading.chars, { scale: 4, opacity: 0, y: 0 }, "lineMinEnd")
        .to(".databases-group ol", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")

        .to(this.othersHeading.chars, { scale: 4, opacity: 0, y: 0 }, "lineMinEnd")
        .to(".others-group ol", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")
        .add('techListHide')
    }

    private projectIntroTrigger() {
        this.timeline
        .from([
            ".projectIntro-heading",
            ...this.projectIntroMessage.lines as HTMLElement[]
        ], {
            scale: 0.5,
            opacity: 0,
            x: -300,
            stagger: 0.2,
        }, "animMoveRightStart")
        .add("projectIntroShow")
        .to([
            ".projectIntro-heading",
            ...this.projectIntroMessage.lines as HTMLElement[]
        ], {
            scale: 0.5,
            opacity: 0,
            x: -300,
            stagger: {
                each: 0.2,
                from: "end",
            },
            // onStart: () => {
            //     console.log('ON_SET_DARK')
            //     this.theme.setDark()
            // },
            // onReverseComplete: () => {
            //     console.log('REV_REMOVE_DARK')
            //     this.theme.removeDark()
            // }
        }, "animMoveCenterStart")
        .add("projectIntroHide")
    }

    private projectTrigger() {
        this.timeline
        .from(".projectCarousel-container", {
            opacity: 0,
            onStart: () => {
                console.log('ON_SET_DARK')
                this.theme.setDark()
                this.carousel.play()
                window.umami.track('Scroll', { position: 'Projects' })
            },
            onReverseComplete: () => {
                console.log('REV_REMOVE_DARK')
                this.theme.removeDark()
                this.carousel.pause()
            }
        }, "starGrowStart")
        .to(".projectNumber", {
            scale: 1,
        }, "<")
        .from(".project-heading-container", {
            opacity: 0,
            x: "50vw",
        }, "<")
        .from(".project-label", {
            opacity: 0,
            x: "50vw",
        }, ">")
        .from(".project-description", {
            opacity: 0,
            x: "50vw",
            pointerEvents: 'none',
        }, "<")
        .from(".project-link", {
            opacity: 0,
            y: 50,
            pointerEvents: 'none',
        }, ">")
        .add("projectShow")

        .from(".control", {
            scale: 0,
            opacity: 0,
            duration: 0.2,
        }, "projectShow")
        .to(".circle circle", {
            strokeDashoffset: 0,
            duration: 1,
            onStart: () => {
                this.controlBtns.forEach(elem => {
                    elem.removeAttribute("disabled")
                })
                Utils.updateInert(".projectFooter", false)
                Utils.updateInert(".project-description", false)
                Utils.updateInert(".project-link", false)
            },
            onReverseComplete: () => {
                this.controlBtns.forEach(elem => {
                    elem.setAttribute("disabled", "disabled")
                })
                Utils.updateInert(".projectFooter", true)
                Utils.updateInert(".project-description", true)
                Utils.updateInert(".project-link", true)
            }
        }, ">")
        .to(".arrow path", {
            strokeDashoffset: 0,
        }, ">")
        .add("controlShow")

        .to(".arrow path", {
            strokeDashoffset: 100,
            onReverseComplete: () => {
                this.controlBtns.forEach(elem => {
                    elem.removeAttribute("disabled")
                })
                Utils.updateInert(".projectFooter", false)
                Utils.updateInert(".project-description", false)
                Utils.updateInert(".project-link", false)
            },
            delay: 0.5
        }, "controlShow")
        .to(".circle circle", {
            strokeDashoffset: 100,
            duration: 1,
            onComplete: () => {
                this.controlBtns.forEach(elem => {
                    elem.setAttribute("disabled", "disabled")
                })
                Utils.updateInert(".projectFooter", true)
                Utils.updateInert(".project-description", true)
                Utils.updateInert(".project-link", true)
            },
        }, ">")
        .to(".control", {
            opacity: 0,
            scale: 0,
            duration: 0.2,
        }, ">")
        .add("controlHide")

        .to(".project", {
            opacity: 0,
            x: "50vw",
        }, "controlHide")
        .to(".projectCarousel-container", {
            opacity: 0,
            onComplete: () => {
                this.carousel.pause()
                Utils.updateInert(".contact-list", false)
            },
            onReverseComplete: () => {
                this.carousel.play()
                Utils.updateInert(".contact-list", true)
            },
        }, "<")
        .to(".projectNumber", {
            scale: 0,
        }, "<")
        .add("projectHide")
    }

    private contactTrigger() {
        this.timeline
        .from(this.contactHeading.chars, {
            scale: 0,
            y: "50vh",
            rotate: -180,
            stagger: {
                each: 0.01,
                from: "edges",
            },
            duration: 1.5,
            ease: "back.out(1)",
        }, "projectHide")
        .from(".contact-list .row", {
            y: "-50vh",
            scale: 0.7,
            stagger: {
                each: 0.1,
                from: "end",
            },
            onStart: () => {
                console.log('ON_REMOVE_DARK')
                this.theme.removeDark()
                window.umami.track('Scroll', { position: 'Contact' })
            },
            onReverseComplete: () => {
                console.log('REV_SET_DARK')
                this.theme.setDark()
            },
        }, "<+0.5")
        .from(".page-footer", {
            y: 200,
            opacity: 0,
            scale: 0,
        },"projectHide+=0.5")
        .to(".playPause", { scale: 0 }, "projectHide")
    }

    private animatorTrigger() {
        const animatorOne = Utils.elem(".animator--one")
        const animatorTwo = Utils.elem(".animator--two")
        const animatorThree = Utils.elem(".animator--three")
        const animatorFour = Utils.elem(".animator--four")
        const MIN_SIZE = 2
        const WMAX = Math.max(window.innerWidth, window.innerHeight)
        const SIZE = gsap.utils.clamp(30, WMAX * 0.1, 200)


        this.timeline
        .to([animatorOne, animatorThree], { width: MIN_SIZE }, "introHide")
        .to([animatorTwo, animatorFour], { height: MIN_SIZE }, "<")
        .to([animatorThree, animatorFour], {
            rotate: 0,
            duration: 0
        }, ">")
        .to(animatorOne, { width: "80vw" }, "<")
        .to(animatorTwo, { height: SIZE }, ">")
        .to(animatorOne, { width: SIZE }, ">")
        .to([animatorOne, animatorTwo], { rotate: 45 }, ">")
        .to(animatorThree, { width: SIZE }, ">")
        .to(animatorFour, { height: SIZE }, "<")
        .add("anmiGrowStart")
        .to([animatorOne, animatorThree], { width: "100vmax" }, ">")
        .to([animatorTwo, animatorFour], { height: "100vmax" }, "<")
        .to(".animator-container", { y: 0 }, "<")
        .add("anmiGrowEnd")
        .to(".animator-container", { y: "25vh" }, "anmiGrowEnd")
        .to([animatorOne, animatorThree], { width: MIN_SIZE }, "<")
        .to([animatorTwo, animatorFour], { height: MIN_SIZE, }, "<")
        .add("anmiShrinkEnd")
        .to(animatorThree, { width: "200vw", duration: 1 }, ">")
        .to(".animator-container", { x: "-50vw" }, "<")
        .to(animatorThree, { width: MIN_SIZE, duration: 1 }, ">")
        .to(animatorThree, { width: "200vw", duration: 1 }, ">")
        .to(".animator-container", { x: "50vw" }, ">")
        .to(animatorThree, { width: MIN_SIZE, duration: 1 }, ">")
        .to(animatorFour, { height: "100vmax" }, ">")
        .to(".animator-container", { y: 0 }, "<")
        .add("anmiRightGrowStart")
        .to([animatorOne, animatorThree], { width: "100vmax" }, ">")
        .to(animatorTwo, { height: "100vmax" }, "<")
        .add("anmiRightGrowEnd")
        .to([animatorTwo, animatorFour], { height: MIN_SIZE }, ">")
        .to(animatorOne, { width: MIN_SIZE }, "<")
        .to(".animator-container", { x: 0 }, ">")
        .to(animatorThree, { width: MIN_SIZE }, "<")
        .add("lineMaxStart")
        .to(animatorFour, { width: this.isLandscape() ? MIN_SIZE : "80vw", height: this.isLandscape() ? "80vh" : MIN_SIZE }, ">")
        .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1 }, ">")
        .to(".animator-container", { y: this.isLandscape() ? "-45vh" : 0, duration: 1 }, "<")
        .to(animatorFour, {
            width: this.isLandscape() ? MIN_SIZE : "80vw",
            height: this.isLandscape() ? "80vh" : MIN_SIZE,
            duration: 1,
        }, ">")
        .to(".animator-container", { y: 0, duration: 1 }, "<")
        .add("lineMaxSecondStart")
        .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1 }, ">")
        .to(".animator-container", { y: this.isLandscape() ? "45vh" : 0, duration: 1 }, "<")
        .add("lineMaxSecondEnd")
        .to(animatorFour, { width: this.isLandscape() ? MIN_SIZE : "80vw", height: this.isLandscape() ? "80vh" : MIN_SIZE, duration: 1 }, ">")
        .to(".animator-container", { y: 0, duration: 1 }, "<")
        .to(".animator-container", { y: this.isLandscape() ? "-45vh" : 0, duration: 1 }, ">")
        .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1,}, "<")
        .to(".animator-container", { y: 0, duration: 1 }, ">")
        .to(animatorFour, { width: this.isLandscape() ? MIN_SIZE : "80vw", height: this.isLandscape() ? "80vh" : MIN_SIZE, duration: 1 }, "<")
        .add("lineMinEnd")
        .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1 }, ">")

        .add("animMoveRightStart")
        .to(animatorThree, {
            x: "25vw",
            width: "50vw",
        }, ">")
        .to(".animator-container", {
            x: this.isLandscape() ? "25vw" : "40vw",
        }, "<")
        .to(animatorFour, {
            height: this.isLandscape() ? "80vh" : "50vh",
        }, ">")
        .to(animatorThree, {
            width: MIN_SIZE,
        }, ">")
        .to(animatorThree, {
            width: "50vw",
        }, ">")
        .to(animatorThree, {
            x: 0,
            width: MIN_SIZE,
        }, ">")
        .add("animMoveCenterStart")
        .to(animatorFour, {
            height: MIN_SIZE,
        }, ">")
        .to(animatorFour, {
            width: "100vw",
        }, ">")
        .to(".animator-container", {
            x: 0,
        }, "<")
        .to([animatorFour, animatorThree], {
            x: 0,
            width: MIN_SIZE,
        }, ">")
        .to(".animator-container", {
            x: this.isLandscape() ? "-25vw" : "-45vw",
        }, "<")
        .add("starGrowStart")
        .to([animatorOne, animatorThree], {
            width: "45vw",
        }, ">")
        .to([animatorTwo, animatorFour], {
            height: "45vw",
        }, "<")
        .to([animatorOne, animatorTwo], {
            rotate: 0,
        }, ">")
        .to([animatorThree, animatorFour], {
            width: MIN_SIZE,
            height: MIN_SIZE,
        }, "<")
        .to([animatorOne, animatorTwo], {
            rotate: -45,
        }, ">")
        .to(animatorThree, {
            width: "45vw",
        }, "<")
        .to(animatorFour, {
            height: "45vw",
        }, "<")
        .add("starStopped")
    }

    private animatorLastTrigger() {
        const animatorOne = Utils.elem(".animator--one")
        const animatorTwo = Utils.elem(".animator--two")
        const animatorThree = Utils.elem(".animator--three")
        const animatorFour = Utils.elem(".animator--four")
        const MIN_SIZE = 2
        // const WMAX = Math.max(window.innerWidth, window.innerHeight)
        // const SIZE = gsap.utils.clamp(30, WMAX * 0.1, 200)

        this.timeline
        .to([animatorOne, animatorThree], {
            width: MIN_SIZE,
            duration: 1,
        }, "controlShow")
        .to([animatorTwo, animatorFour], {
            height: MIN_SIZE,
            duration: 1,
        }, "<")
        .add("starPaused")
        .to(animatorThree, {
            width: "45vw",
        }, ">")
        .to(animatorThree, {
            width: MIN_SIZE,
        }, ">")
        .add("starShrinkEnd")
        .to(animatorThree, {
            width: this.isLandscape() ? "50vw" : "90vw",
        }, ">")
        .to(".animator-container", {
            x: 0,
        }, "<")
    }

    private backgroundTimeline() {
        this.timeline
        .to(".background", { opacity: 0 }, "timelineStart")
        .to('.bg', { scale: 0.5, stagger: { each: 0.05, from: "end" } }, "<")
        .to(".lights", { y: '-50%' }, "<+=0.2")
        .to(".light", { scale: 1, stagger: 0.05 }, "<")
        .to(".logo", {
            y: 0,
        }, "<")

        // starGrowStart
        .to(".logo", {
            y: -100,
        }, "starGrowStart-=0.5")
        .to(".lights", { y: '-60%' }, "<")
        .to('.light', { scale: 0, stagger: { each: 0.05, from: "end" } }, "<")
        .to('.background', { opacity: 1 }, "<")
        .to('.bg', { scale: 1, stagger: 0.1 }, "<")

        .to(".logo", {
            y: 0,
        }, "projectHide")
        .to('.background', { opacity: 0 }, "<")
        .to(".lights", { y: '-50%' }, "<")
        .to('.light', { scale: 1, stagger: 0.05 }, "<")
    }

    private isLandscape() {
        return Utils.isMedia("(orientation: landscape)")
    }
}