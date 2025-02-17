import gsap from "gsap";
import { elem, elems, updateInert } from "./helpers/utils";
import { Projects } from "./projects";
import { AutoScroller } from "./scroll";
import { Toast } from "./toast";

export class KeyboardHandler {
    private shortcutEl: HTMLButtonElement
    private playPause: HTMLElement
    private introEl: HTMLElement
    private techInteroEl: HTMLElement
    private techTitles: NodeListOf<HTMLElement>
    private projectTitle: HTMLElement
    private pTitle: HTMLElement
    private contactEl: HTMLElement
    private modalEl: HTMLDialogElement

    private steps: HTMLElement[] = []
    private _step: number = -1
    private isTouchFocus: boolean = false

    constructor(
        private project: Projects,
        private scroll: AutoScroller,
        private toast: Toast
    ) {
        this.shortcutEl = elem<HTMLButtonElement>('.open-shortcuts')
        this.playPause = elem('.playPause')
        this.introEl = elem('.person-name')
        this.techInteroEl = elem('.intro-title')
        this.techTitles = elems('.technical-title')
        this.projectTitle = elem('.projects-title')
        this.pTitle = elem('.project-header')
        this.contactEl = elem('.contact-me')
        this.modalEl = elem<HTMLDialogElement>('.shortcuts-modal')

        this.steps = [
            this.introEl, this.techInteroEl, this.projectTitle, this.contactEl
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

        if (this._step > -1) {
            const elem = this.steps[this._step]
            elem.focus()
        }
    }

    eventListeners() {
        this.shortcutEl.addEventListener('click', () => {
            this.modalEl.showModal()
        })
        this.shortcutEl.addEventListener("focus", () => {
            this.scrollTo(0, -1)
        })

        document.addEventListener("touchstart", () => {
            this.isTouchFocus = true
        }, { passive: true })

        // Detect keyboard navigation (e.g., Tab key)
        document.addEventListener("keydown", () => {
            this.isTouchFocus = false
        })

        this.playPause.addEventListener("focus", () => {
            if (this.isTouchFocus) return
            this.toast.show(Toast.PLAY_PAUSE)
            this.scrollTo(0, -1)
        })
        this.playPause.addEventListener("blur", () => {
            this.toast.hide()
        })

        this.introEl.addEventListener("focus", () => {
            this.scrollTo(window.innerHeight, 0)
        })

        this.techInteroEl.addEventListener("focus", () => {
            this.scrollTo(window.innerHeight * 2.8, 1)
        })

        this.techTitles.forEach((elem) => {
            const scroll = Number(elem.dataset.scroll)
            elem.addEventListener("focus", () => {
                this.scrollTo(window.innerHeight * scroll)
            })
        })

        this.projectTitle.addEventListener("focus", () => {
            this.scrollTo(window.innerHeight * 6.9, 2)
        })

        this.pTitle.addEventListener("focus", () => {
            this.toast.show(Toast.PREV_NEXT)
            this.scrollTo(window.innerHeight * 9.5)
        })
        this.pTitle.addEventListener("blur", () => {
            this.toast.hide()
        })

        this.contactEl.addEventListener("focus", () => {
            this.scrollTo(window.innerHeight * 20, 3)
        })

        elem('.last-focus').addEventListener("focus", () => {
            this.toast.show(Toast.GO_TOP)
        })
        elem('.last-focus').addEventListener("blur", () => {
            this.toast.hide()
        })

        document.addEventListener("keydown", (event) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return
            }

            const key = event.key
            if (this.modalEl.open) {
                if (key === "s") {
                    this.modalEl.close()
                }
                return
            }
            const projectControls = elem('.project-footer')
            if (!projectControls.hasAttribute('inert')) {
                if (key === "ArrowLeft") {
                    this.project.renderProject("previous")
                } else if (key === "ArrowRight") {
                    this.project.renderProject("next")
                }
            }

            if (key === "k") {
                this.scroll.toggle(true)
            } else if (key === "j" || key === "ArrowUp") {
                this.step -= 1
            } else if (key === "l" || key === "ArrowDown") {
                this.step += 1
            } else if (key === "t") {
                this.introEl.focus()
            } else if (key === "o") {
                this.techTitles[0].focus()
            } else if (key === "p") {
                this.pTitle.focus()
            } else if (key === "c") {
                this.contactEl.focus()
            } else if (key === "s") {
                this.modalEl.showModal()
            }
        })
    }

    private scrollTo(y: number, step?: number) {
        this.scroll.onWheel()

        if (step !== null && step !== undefined) {
            this._step = step
        }

        gsap.to(window, {
            duration: 0,
            scrollTo: { y },
            ease: "none",
        })
    }
}