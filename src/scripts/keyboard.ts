import gsap from "gsap";
import { elem, elems, updateInert } from "./helpers/utils";
import { Projects } from "./projects";
import { AutoScroller } from "./scroll";

export class KeyboardHandler {
    private introEl: HTMLElement
    private techInteroEl: HTMLElement
    private techTitles: NodeListOf<HTMLElement>
    private projectTitle: HTMLElement
    private pTitle: HTMLElement
    private contactEl: HTMLElement
    private totopEl: HTMLButtonElement

    private steps: HTMLElement[] = []
    private _step: number = -1;

    constructor(
        private project: Projects,
        private scroll: AutoScroller
    ) {
        this.introEl = elem('.person-name')
        this.techInteroEl = elem('.intro-title')
        this.techTitles = elems('.technical-title')
        this.projectTitle = elem('.projects-title')
        this.pTitle = elem('.project-header')
        this.contactEl = elem('.contact-me')
        this.totopEl = elem<HTMLButtonElement>('.goto-top')

        this.steps = [
            elem('.playPause'), this.introEl, this.techInteroEl, 
            this.techTitles[0], this.techTitles[1], this.techTitles[2], this.techTitles[3],
            this.projectTitle, this.pTitle, this.contactEl
        ]

        updateInert(elem('.main'), false)
        this.eventListeners()
    }

    get step() {
        return this._step
    }
    set step(step: number) {
        const max = this.steps.length - 1
        this._step = Math.max(0, Math.min(step, max))

        console.log(this._step, max)

        if (this._step > -1) {
            const elem = this.steps[this._step]
            console.log("ELEM", elem)
            elem.focus()
        }
    }

    eventListeners() {
        this.introEl.addEventListener("focus", () => {
            this._step = 1
            gsap.to(window, {
                duration: 0,
                scrollTo: { y: window.innerHeight },
                ease: "none",
                // overwrite: true,
            })
        })

        this.techInteroEl.addEventListener("focus", () => {
            this._step = 2
            gsap.to(window, {
                duration: 0,
                scrollTo: { y: (window.innerHeight * 2.5) },
                ease: "none",
                // overwrite: true,
            })
        })

        this.techTitles.forEach((elem, index) => {
            const scroll = Number(elem.dataset.scroll)
            elem.addEventListener("focus", () => {
                this._step = 3 + index
                gsap.to(window, {
                    duration: 0,
                    scrollTo: { y: (window.innerHeight * scroll) },
                    ease: "none",
                    // overwrite: true,
                })
            })
        })

        this.projectTitle.addEventListener("focus", () => {
            this._step = 7
            gsap.to(window, {
                duration: 0,
                scrollTo: { y: (window.innerHeight * 6.9) },
                ease: "none",
                // overwrite: true,
            })
        })

        this.pTitle.addEventListener("focus", () => {
            this._step = 8
            gsap.to(window, {
                duration: 0,
                scrollTo: { y: (window.innerHeight * 9.5) },
                ease: "none",
                // overwrite: true,
            })
        })

        this.contactEl.addEventListener("focus", () => {
            this._step = 9
            gsap.to(window, {
                duration: 0,
                scrollTo: { y: (window.innerHeight * 20) },
                ease: "none",
                // overwrite: true,
            })
        })

        this.totopEl.addEventListener("focus", () => {
            this.totopEl.classList.add('focused')
        })
        this.totopEl.addEventListener("blur", () => {
            this.totopEl.classList.remove('focused')
        })
        this.totopEl.addEventListener("click", () => {
            this.introEl.focus()
        })

        document.addEventListener("keydown", (event) => {
            const key = event.key
            const projectControls = elem('.project-footer')
            if (!projectControls.hasAttribute('inert')) {
                if (key === "ArrowLeft") {
                    this.project.renderProject("previous")
                } else if (key === "ArrowRight") {
                    this.project.renderProject("next")
                }
            } 
            
            if (key === "k") {
                this.scroll.toggle()
            } else if (key === "j" || key === "ArrowUp") {
                this.step -= 1
            } else if (key === "l" || key === "ArrowDown") {
                this.step += 1
            }
        })
    }
}