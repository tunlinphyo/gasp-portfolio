import gsap from "gsap"
import { addClass, applyStyles, elem, innerHTML, innerText, removeClass } from "./helpers/utils"

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    url?: string;
}

export default class Projects {
    protected readonly projects: Project[] = [
        {
            id: 1,
            title: 'Yomiuri Shimbun',
            category: 'E-commerce &#10141; Ec-Cube 4.2',
            description: `
                Led a team in developing multiple websites for Yomiuri Shinbun using EC-Cube 4.2.
                Designed a flexible database structure to support customer customization requests.
                Implemented payment plugins such as GMO and Sony. Enabled CSV uploads for Google
                BigQuery using google/cloud-storage. Provided support to team members in UI/UX
                and the EC-Cube framework.
            `,
            url: 'https://aej.store.yomiuri.co.jp/'
        },
        {
            id: 2,
            title: 'CoreMobile',
            category: 'Portfolio &#10141; React, Next',
            description: `
                Created a portfolio website for CoreMobile, which included the initial loading animation and scroll
                animations using IntersectionObserver. Additionally, Trained junior developers to ensure that the
                website was responsive and suitable for all devices using Next.js (React).
            `,
            url: 'https://www.coremobile.co.jp/'
        },
        {
            id: 3,
            title: 'United Arrows',
            category: 'Apparel EC &#10141; Vue, VueX',
            description: `
                Fixed bugs, improved stability, and implemented new features for a Clothing simulation
                web-app for United Arrows using Vue.js and Vuex. This involved addressing issues
                left behind by the previous developer.
            `
        },
        {
            id: 4,
            title: 'Shirt Simulator',
            category: 'Coding &#10141; Vue, Nuxt 3',
            description: `
                A sample website for Shirt Simulation using Nuxt 3. Created custom plugins (
                <a href="https://shirt-simulation.vercel.app/document/toasts" target="_blank">Toast,</a>
                <a href="https://shirt-simulation.vercel.app/document/alerts" target="_blank">Alert,</a>
                <a href="https://shirt-simulation.vercel.app/document/confirms" target="_blank">Confirm,</a>
                <a href="https://shirt-simulation.vercel.app/document/loading" target="_blank">Loading</a>
                ) that can use with modern Js syntax.
            `,
            url: 'https://shirt-simulation.vercel.app/'
        },
        {
            id: 5,
            title: 'Inhouse Furniture',
            category: 'E-commerce &#10141; Svelte',
            description: `
                Structured the project using Sapper (predecessor of SvelteKit) and implemented APIs with the backend.
                Ensured website responsiveness across devices by adapting the UI design for desktop, redesigning for mobile
                and tablet views, ensuring a visually pleasing and user-friendly experience on all screens.
            `,
            url: 'https://inhousemm.com/'
        }
    ]
    protected currentIndex: number = 0
    protected animating: boolean = false
    constructor(
        // private readonly carousel: GSAPTween
    ) {
        this.subscribe()
    }

    get rect() {
        return elem(".projects").getBoundingClientRect()
    }

    get project() {
        return this.projects[this.currentIndex]
    }

    set index(number: number) {
        const len = this.projects.length - 1

        if (number < 0) this.currentIndex = len
        else if (number > len) this.currentIndex = 0
        else this.currentIndex = number
    }

    protected subscribe() {
        elem(".control.previous").addEventListener("click", () => {
            this.renderProject("previous")
        })
        elem(".control.next").addEventListener("click", () => {
            this.renderProject("next")
        })
    }

    private renderProject(action: "previous" | "next") {
        if (this.animating) return

        let isNext = true
        if (action === "previous") {
            isNext = false
            this.index = this.currentIndex - 1
        }
        if (action === "next") {
            isNext = true
            this.index = this.currentIndex + 1
        }

        // const currentTimeScale = this.carousel.timeScale()
        // console.log(currentTimeScale)
        // this.carousel.timeScale(0.5)

        const controls = elem(".controls")

        const timeline = gsap.timeline()

        const leave = isNext ? -1 : 1
        const enter = isNext ? 1 : -1

        addClass(controls, "disabled")
        this.animating = true

            const project = elem(".projects .project")
            const width = this.rect.width * 0.9

            timeline.fromTo(project, {
                x: 0,
            }, {
                x: width * leave,
                ease: "power2.in",
                onComplete: () => {
                    this.renderData()
                },
            })

            timeline.fromTo(project, {
                x: width * enter,
            }, {
                x: 0,
                duration: 0.4,
                ease: "power1.out",
                onComplete: () => {
                    removeClass(controls, "disabled")
                    this.animating = false
                    // this.carousel.timeScale(1)
                },
            })
    }

    private renderData() {
        innerText(".project-title", this.project.title)
        innerHTML(".project-desc", this.project.description)
        if (this.project.url) {
            applyStyles(".project-link", { display: "flex" })
            elem(".project-link").setAttribute("href", this.project.url || "")
        } else {
            applyStyles(".project-link", { display: "none" })
        }
    }
}