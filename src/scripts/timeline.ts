import gsap from "gsap"
import { elem } from "./helpers/utils"
import SplitType from "split-type"

export function animator() {
    const landscape = window.matchMedia("(orientation: landscape)")

    const personName = new SplitType(".person-name", { types: 'chars' })
    const personAbout = new SplitType(".person-about", { types: 'words,chars' })
    const introTitle = new SplitType(".intro-title", { types: 'chars' })
    const introDesc = new SplitType(".intro-description > p", { types: 'lines' })
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

    const MIN_SIZE = 2
    const WMAX = Math.max(window.innerWidth, window.innerHeight)
    const SIZE = gsap.utils.clamp(30, WMAX * 0.1, 200)
    
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-trigger",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            // markers: true,
        }
    })

    timeline
    .fromTo(".hello-message", { opacity: 1, scale: 1 }, { opacity: 0, scale: 5 })
    .fromTo(".mouse", { y: 0, opacity: 1 }, { y: 200, opacity: 0 }, "<")
    .add("helloHided")

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
    .to([animatorTwo, animatorFour], { height: MIN_SIZE }, "<")
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
    .from(introDesc.lines, { x: 200, opacity: 0, stagger: 0.2 }, ">-0.5")
    .to(".animator-container", { x: "-50vw", y: 0 }, "starHided")
    .to(animatorThree, { width: "200vw", duration: 1 }, ">")
    .to(".animator-container", { x: "50vw" }, ">")
    .to(animatorThree, { width: MIN_SIZE, duration: 1 }, ">")
    .to([animatorOne, animatorThree], { width: "100vmax" }, ">")
    .to([animatorTwo, animatorFour], { height: "100vmax" }, "<")
    .to(introDesc.lines, { x: -200, opacity: 0 }, "<")
    .add("linesOne")

    .to([animatorTwo, animatorFour], { height: MIN_SIZE }, ">")
    .to(animatorOne, { width: MIN_SIZE }, "<")
    .to(".animator-container", { x: 0 }, ">")
    .to(animatorThree, { width: MIN_SIZE }, "<")
    .to(animatorFour, { width: landscape.matches ? MIN_SIZE : "90vw", height: landscape.matches ? "90vh" : MIN_SIZE }, "widthZero")
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
    }, "techLeaved")
    .from(".desc-language", { opacity: 0, y: 100 }, "<")
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
    .from(".desc-framework", { opacity: 0, y: 100 }, "<")
    .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1 }, ">")
    .to(".animator-container", { y: landscape.matches ? "-45vh" : 0, duration: 1 }, "<")
    .to(animatorFour, {
        width: landscape.matches ? MIN_SIZE : "90vw",
        height: landscape.matches ? "90vh" : MIN_SIZE,
        duration: 1,
    }, ">")
    .to(".animator-container", { y: 0, duration: 1 }, "<")
    .add("techFirst")

    .to(language.chars, { scale: 0, opacity: 0, y: 100 }, "techFirst")
    .to(".desc-language", { opacity: 0, y: 100 }, "<")
    .to(framework.chars, { scale: 0, opacity: 0, y: 100 }, "techFirst")
    .to(".desc-framework", { opacity: 0, y: 100 }, "<")
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
    }, "techSecond")
    .from(".desc-database", { opacity: 0, y: 100 }, "<")
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
    }, "techSecond")
    .from(".desc-other", { opacity: 0,  y: 100 }, "<")
    .to(animatorFour, { width: MIN_SIZE, height: MIN_SIZE, duration: 1 }, ">")
    .to(".animator-container", { y: landscape.matches ? "45vh" : 0, duration: 1 }, "<")
    .to(animatorFour, { width: landscape.matches ? MIN_SIZE : "90vw", height: landscape.matches ? "90vh" : MIN_SIZE, duration: 1 }, ">")
    .to(".animator-container", { y: 0, duration: 1 }, "<")
    .add("techLast")

    .to(database.chars, { scale: 4, opacity: 0, y: 100 }, "techLast")
    .to(".desc-database", {
        opacity: 0,
        y: 100,
    }, "<")
    .to(other.chars, {
        scale: 4,
        opacity: 0,
        y: 100,
    }, "techLast")
    .to(".desc-other", {
        opacity: 0,
        y: 100,
    }, "<")
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
        x: landscape.matches ? "25vw" : "40vw",
    }, "<")
    .to(animatorFour, {
        height: "90vh",
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
    .to([animatorFour, animatorThree], {
        x: 0,
        width: MIN_SIZE,
    }, ">")
    .to(".animator-container", {
        x: landscape.matches ? "-25vw" : "-45vw",
    }, "<")
    .add("projectIntroLeave")

    .to([animatorOne, animatorThree], {
        width: "45vw",
    }, "projectIntroLeave")
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
    }, ">")

    .from(".control", {
        scale: 0,
        opacity: 0,
        duration: 0.2,
    }, "starEnd")
    .to(".circle circle", {
        strokeDashoffset: 0,
        duration: 1,
    }, ">")
    .to(".control .icon", {
        scaleX: 1,
    }, ">-0.2")
    .add("controlEnd")


    .to([animatorOne, animatorThree], {
        width: MIN_SIZE,
    }, "controlEnd")
    .to([animatorTwo, animatorFour], {
        height: MIN_SIZE,
    }, "<")
    .add("starPaused")
    .to(animatorThree, {
        width: "45vw",
    }, ">")
    .to(animatorThree, {
        width: MIN_SIZE,
    }, ">")
    .add("starDone")

    
    .to(".circle circle", {
        strokeDashoffset: 100,
        duration: 1,
    }, "starPaused")
    .to(".control .icon", {
        scaleX: 0,
    }, ">")
    .to(".control", {
        opacity: 0,
        scale: 0,
        duration: 0.2,
    }, ">")

    .to(animatorThree, {
        width: window.innerWidth * (landscape.matches ? 0.5 : 0.9),
    }, "starDone")
    .to(".animator-container", {
        x: 0,
    }, "<")
    .to(".project-title", {
        opacity: 0,
        x: "50vw",
    }, "<")
    .to(".project-desc", {
        opacity: 0,
        x: "50vw",
    }, "<")
    .add("projectEnd")

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
    }, "projectEnd-=0.2")
    .from(".contacts .row", {
        y: "-25vh",
        scale: 0.8,
        stagger: {
            each: 0.1,
            from: "end",
        },
    }, "projectEnd+=0.4")

    .from(".footer", {
        y: 200,
        opacity: 0,
        scale: 0,
    },"projectEnd")
}