import gsap from "gsap"
import { elem, elems, isMedia, updateInert } from "./helpers/utils"
import SplitType from "split-type"
import { MIN_SIZE } from "./helpers/const"
import { setDark, removeDark, setLight, removeLight } from "./theme"

export function animator(carousel: GSAPTween) {
    const isLandscape = isMedia("(orientation: landscape)")

    const personName = new SplitType(".person-name", { types: 'chars' })
    const personAbout = new SplitType(".person-about", { types: 'words,chars' })
    const introTitle = new SplitType(".intro-title", { types: 'chars' })
    // const introDesc = new SplitType(".intro-description > p", { types: 'lines' })
    const language = new SplitType(".title-language", { types: 'chars' })
    const framework = new SplitType(".title-framework", { types: 'chars' })
    const database = new SplitType(".title-database", { types: 'chars' })
    const other = new SplitType(".title-other", { types: 'chars' })
    const projrctDesc = new SplitType(".projects-description", { types: 'lines' })
    const contact = new SplitType(".contact-start h2", { types: 'chars' })

    const animatorOne = elem(".animator--one")
    const animatorTwo = elem(".animator--two")
    const animatorThree = elem(".animator--three")
    const animatorFour = elem(".animator--four")

    const WMAX = Math.max(window.innerWidth, window.innerHeight)
    const SIZE = gsap.utils.clamp(30, WMAX * 0.1, 200)

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-trigger",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            // markers: true,
        }
    })

    const controlBtns = elems(".control");

    timeline
    .fromTo(".hello-message", { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.25 })
    .fromTo(".mouse", { y: 0, opacity: 1 }, { y: 200, opacity: 0 }, "<")
    .to('.open-shortcuts', { scale: 0 }, "<")
    .add('bgStart')
    .to(".background", { opacity: 0 }, "<")
    .to('.bg', { scale: 0.5, stagger: { each: 0.05, from: "end" } }, "<")
    .to(".lights", { y: '-50%' }, "-=0.5")
    .to(".light", { scale: 1, stagger: 0.05 }, "<")
    .to(".logo", {
        y: 0,
    }, "<")
    // .to(".mountain", { translateY: 0, stagger: 0.1 }, "<")
    .to([animatorOne, animatorThree], { width: MIN_SIZE }, "bgStart")
    .to([animatorTwo, animatorFour], { height: MIN_SIZE }, "<")
    .to([animatorThree, animatorFour], {
        rotate: 0,
        duration: 0
    }, ">")
    .add("helloHided")
    .to(null, {
        duration: 0,
        onComplete: () => {
            setLight()
        },
        onReverseComplete: () => {
            removeLight()
        }
    })

    .to(personName.chars, { scale: 1, opacity: 1, ease: "back.out(1)", stagger: 0.02 }, "helloHided-=0.1")
    .to(personAbout.chars, { scale: 1, opacity: 1, ease: "back.out(1)", stagger: 0.01 }, "<")
    .to(animatorOne, { width: "80vw" }, "<")
    .to(animatorTwo, { height: SIZE }, ">")
    .to(animatorOne, { width: SIZE }, ">")
    .to([animatorOne, animatorTwo], { rotate: 45 }, ">")
    .to(animatorThree, { width: SIZE }, ">")
    .to(animatorFour, { height: SIZE }, "<")
    .to([animatorOne, animatorThree], { width: "100vmax" }, ">")
    .to([animatorTwo, animatorFour], { height: "100vmax" }, "<")
    .to(".animator-container", { y: 0 }, "<")
    .add("starMax")

    .to(personName.chars, { transformOrigin: "top center", scale: 4, opacity: 0 }, "<")
    .to(".person-about", { scale: 0, opacity: 0 }, "<")
    .to(".animator-container", { y: "25vh" }, "starMax")
    .to([animatorOne, animatorThree], { width: MIN_SIZE }, "<")
    .to([animatorTwo, animatorFour], {
        height: MIN_SIZE,
    }, "<")
    .add("starHided")

    .from(introTitle.chars, {
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
    }, "<")
    .from('.intro-description > li', { x: 200, opacity: 0, stagger: 0.2 }, ">-0.5")
    // .to(".animator-container", { y: '25vh' }, "starHided")
    .to(animatorFour, { height: "50vh", y: "-12.5vh" }, "starHided")
    .to(animatorFour, { height: MIN_SIZE, y: 0 }, ">")
    .to(animatorThree, { width: "200vw", duration: 1 }, ">")
    .to(".animator-container", { x: "-50vw" }, "<")
    .to(".animator-container", { x: "50vw" }, ">")
    .to(animatorThree, { width: MIN_SIZE, duration: 1 }, ">")
    .to([animatorOne, animatorThree], { width: "100vmax" }, ">")
    .to([animatorTwo, animatorFour], { height: "100vmax" }, "<")
    .to('.intro-description > li', { x: -200, opacity: 0 }, "<")
    .to(".animator-container", { y: 0 }, "<")
    .add("linesOne")

    .to([animatorTwo, animatorFour], { height: MIN_SIZE }, ">")
    .to(animatorOne, { width: MIN_SIZE }, "<")
    .to(".animator-container", { x: 0 }, ">")
    .to(animatorThree, { width: MIN_SIZE }, "<")
    .to(animatorFour, { width: isLandscape ? MIN_SIZE : "80vw", height: isLandscape ? "80vh" : MIN_SIZE }, "widthZero")
    .to(introTitle.chars, {
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
    }, "linesOne")
    .add("techLeaved")
    .from(language.chars, {
        scale: 0,
        opacity: 0,
        y: 50,
        stagger: {
            each: 0.01,
            from: "center",
        },
        duration: 0.7,
        ease: "bounce.out",
        onStart: () => {
            window.umami.track('Scroll', { position: 'Technical' })
        }
    }, "techLeaved")
    .from(".desc-language", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")
    .from(framework.chars, {
        scale: 0,
        opacity: 0,
        y: 50,
        stagger: {
            each: 0.01,
            from: "center",
        },
        duration: 0.7,
        ease: "bounce.out",
    }, "techLeaved")
    .from(".desc-framework", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")
    .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1 }, ">")
    .to(".animator-container", { y: isLandscape ? "-45vh" : 0, duration: 1 }, "<")
    .to(animatorFour, {
        width: isLandscape ? MIN_SIZE : "80vw",
        height: isLandscape ? "80vh" : MIN_SIZE,
        duration: 1,
    }, ">")
    .to(".animator-container", { y: 0, duration: 1 }, "<")
    .add("techFirst")

    .to(language.chars, { scale: 0.5, opacity: 0, y: -100 }, "techFirst")
    .to(".desc-language", { opacity: 0, y: -100, pointerEvents: 'none' }, "<")
    .to(framework.chars, { scale: 0.5, opacity: 0, y: -100, pointerEvents: 'none' }, "techFirst")
    .to(".desc-framework", { opacity: 0, y: -100, pointerEvents: 'none' }, "<")
    .add("techSecond")

    .from(database.chars, {
        scale: 0,
        opacity: 0,
        y: 50,
        stagger: {
            each: 0.01,
            from: "center",
        },
        duration: 0.7,
        ease: "bounce.out",
    }, "techSecond <")
    .from(".desc-database", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")
    .from(other.chars, {
        scale: 0,
        opacity: 0,
        y: 50,
        stagger: {
            each: 0.01,
            from: "center",
        },
        duration: 0.7,
        ease: "bounce.out",
    }, "techSecond <")
    .from(".desc-other", { opacity: 0,  y: 100, pointerEvents: 'none' }, "<")
    .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1 }, ">")
    .to(".animator-container", { y: isLandscape ? "45vh" : 0, duration: 1 }, "<")
    .to(animatorFour, { width: isLandscape ? MIN_SIZE : "80vw", height: isLandscape ? "80vh" : MIN_SIZE, duration: 1 }, ">")
    .to(".animator-container", { y: 0, duration: 1 }, "<")
    .add("techLast")

    .to(database.chars, { scale: 4, opacity: 0, y: 0 }, "techLast")
    .to(".desc-database", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")
    .to(other.chars, { scale: 4, opacity: 0, y: 0 }, "techLast")
    .to(".desc-other", { opacity: 0, y: 100, pointerEvents: 'none' }, "<")
    .to(animatorFour, {
        width: MIN_SIZE,
        height: MIN_SIZE,
        duration: 1,
    }, "<")
    .add("techFinish")

    .from([
        ".projects-title",
        ...projrctDesc.lines as HTMLElement[]
    ], {
        scale: 0.5,
        opacity: 0,
        x: -300,
        stagger: 0.2,
    }, "techFinish")
    .to(animatorThree, {
        x: "25vw",
        width: "50vw",
    }, "<")
    .to(".animator-container", {
        x: isLandscape ? "25vw" : "40vw",
    }, "<")
    .to(animatorFour, {
        height: isLandscape ? "80vh" : "50vh",
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
    .add("projectLeave")
    .to(animatorFour, {
        height: MIN_SIZE,
    }, ">")
    .to(animatorFour, {
        width: "100vw",
    }, ">")
    .to(".animator-container", {
        x: 0,
    }, "<")
    .add("lightHide")
    .to([
        ".projects-title",
        ...projrctDesc.lines as HTMLElement[]
    ], {
        scale: 0.5,
        opacity: 0,
        x: -300,
        stagger: {
            each: 0.2,
            from: "end",
        },
    }, "projectLeave")
    // .to(document.body, {
    //     duration: 0,
    //     onComplete: () => {
    //         convertTheme()
    //     },
    //     onReverseComplete: () => {
    //         convertTheme()
    //     }
    // })
    .to([animatorFour, animatorThree], {
        x: 0,
        width: MIN_SIZE,
    }, ">")
    .to(".animator-container", {
        x: isLandscape ? "-25vw" : "-45vw",
    }, "<")
    .from(".carousel-container", {
        opacity: 0,
        onStart: () => {
            carousel.play()
            window.umami.track('Scroll', { position: 'Projects' })
        },
        onReverseComplete: () => {
            carousel.pause()
        }
    }, "<")
    .add("projectIntroLeave")
    .to(".logo", {
        y: -100,
    }, "lightHide")
    .to(".lights", { y: '-60%' }, "<")
    .to('.light', { scale: 0, stagger: { each: 0.05, from: "end" } }, "<")
    .to('.background', { opacity: 1 }, "<")
    .to('.bg', { scale: 1, stagger: 0.1 }, "<")

    .to([animatorOne, animatorThree], {
        width: "45vw",
        onStart: () => {
            setDark()
        },
        onReverseComplete: () => {
            removeDark()
        }
    }, "projectIntroLeave")
    .to(".project-number", {
        scale: 1,
    }, "<")
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
    .add("starEnd")

    .from(".project-title", {
        opacity: 0,
        x: "50vw",
    }, "projectIntroLeave")
    .from(".project-desc", {
        opacity: 0,
        x: "50vw",
        pointerEvents: 'none',
    }, ">")
    .from(".project-cateogry", {
        opacity: 0,
        x: "50vw",
    }, "<")
    .from(".project-link", {
        opacity: 0,
        y: 50,
        pointerEvents: 'none',
    }, ">")

    .from(".control", {
        scale: 0,
        opacity: 0,
        duration: 0.2,
    }, "starEnd")
    .to(".circle circle", {
        strokeDashoffset: 0,
        duration: 1,
        onStart: () => {
            // console.log('FPRWARD_START')
            controlBtns.forEach(elem => {
                elem.removeAttribute("disabled")
            })
            updateInert(".project-footer", false)
            updateInert(".project-desc", false)
            updateInert(".project-link", false)
        },
        onReverseComplete: () => {
            // console.log('REVERT_END')
            controlBtns.forEach(elem => {
                elem.setAttribute("disabled", "disabled")
            })
            updateInert(".project-footer", true)
            updateInert(".project-desc", true)
            updateInert(".project-link", true)
        }
    }, ">")
    .to(".arrow path", {
        strokeDashoffset: 0,
    }, ">")
    .add("controlEnd")

    .to([animatorOne, animatorThree], {
        width: MIN_SIZE,
        duration: 1,
    }, "controlEnd")
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
    .add("starDone")


    .to(".arrow path", {
        strokeDashoffset: 100,
        onReverseComplete: () => {
            // console.log('REVERT_START')
            controlBtns.forEach(elem => {
                elem.removeAttribute("disabled")
            })
            updateInert(".project-footer", false)
            updateInert(".project-desc", false)
            updateInert(".project-link", false)
        },
    }, "starPaused")
    .to(".circle circle", {
        strokeDashoffset: 100,
        duration: 1,
        onComplete: () => {
            // console.log('FPRWARD_END')
            controlBtns.forEach(elem => {
                elem.setAttribute("disabled", "disabled")
            })
            updateInert(".project-footer", true)
            updateInert(".project-desc", true)
            updateInert(".project-link", true)
        },
    }, ">")
    .to(".control", {
        opacity: 0,
        scale: 0,
        duration: 0.2,
    }, ">")

    .to(animatorThree, {
        width: isLandscape ? "50vw" : "90vw",
    }, "starDone")
    .to(".animator-container", {
        x: 0,
    }, "<")
    .to(".project", {
        opacity: 0,
        x: "50vw",
    }, "<")
    .to(".carousel-container", {
        opacity: 0,
        onComplete: () => {
            carousel.pause()
            updateInert(".contacts", false)
        },
        onReverseComplete: () => {
            carousel.play()
            updateInert(".contacts", true)
        },
    }, "<")
    .to('.bg', { scale: 0.5, stagger: {
        each: 0.1,
        from: "end"
    } }, "<")
    .to(".project-number", {
        scale: 0,
    }, "<")
    .to(".playPause", { scale: 0 }, "<")
    .add("projectEnd")
    .to(".logo", {
        y: 0,
    }, "projectEnd-=0.6")
    // .to('.lights', { opacity: 1 }, "<")
    .to('.background', { opacity: 0 }, "<")
    .to(".lights", { y: '-50%' }, "<")
    .to('.light', { scale: 1, stagger: 0.05 }, "<")
    // .to(document.body, {
    //     duration: 0,
    //     onComplete: () => {
    //         convertTheme()
    //     },
    //     onReverseComplete: () => {
    //         convertTheme()
    //     },
    // })

    .from(contact.chars, {
        scale: 0,
        y: "50vh",
        rotate: -180,
        stagger: {
            each: 0.01,
            from: "edges",
        },
        duration: 1.5,
        ease: "back.out(1)",
        onStart: () => {
            removeDark()
            window.umami.track('Scroll', { position: 'Contact' })
        },
        onReverseComplete: () => {
            setDark()
        },
    }, "projectEnd-=0.5")
    .from(".contacts .row", {
        y: "-50vh",
        scale: 0.7,
        stagger: {
            each: 0.1,
            from: "end",
        },
    }, "projectEnd+=0.1")

    .from(".footer", {
        y: 200,
        opacity: 0,
        scale: 0,
    },"projectEnd")
}