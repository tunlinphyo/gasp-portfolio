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
            id: 7,
            title: 'CSSBattle',
            category: 'Showcase &#10141; Typescript, CSS',
            description: `
                Welcome to my CSSBattle showcase! This website is a curated collection of my solutions to challenges on 
                <a 
                    href="https://cssbattle.dev" 
                    class="cursor--link"
                    data-cursor="open"
                    target="_blank"
                    rel="noopener noreferrer"
                >CSSBattle</a>, 
                a platform that pits developers against creative coding tasks to refine their CSS skills.
                My goal is to achieve a 100% match with the target designs, emphasizing precision, clarity, 
                and the use of the latest CSS patterns and best practices.
            `,
            url: 'https://css-battle-codes.web.app/about'
        },
        {
            id: 4,
            title: 'OS Simulator',
            category: 'Coding &#10141; Typescript',
            description: `
                Paper OS is a minimalist, web-based operating system simulation designed for a 2-bit screen,
                similar to the Playdate game console. It provides a simple, distraction-free interface with
                features like notes, a clock, and a calendar. The site offers a unique digital workspace
                that mimics the basic functionality of an operating system, making it suitable for focused tasks
                in a nostalgic, low-resolution environment.
            `,
            url: 'https://paper-os.web.app/'
        },
        {
            id: 6,
            title: 'Ec-Cube Plugins',
            category: 'Plugins &#10141; PHP',
            description: `
                I have developed plugins such as “EC-CUBE Editor.js Blog Integration”, which enables dynamic blog
                creation with features like image galleries and tables, and “EC-CUBE Editor.js Product Free Area”, which
                allows for rich content customization on product pages in EC-CUBE 4.2 and 4.3.
            `,
            url: 'https://www.ec-cube.net/products/list.php?partner_id=2867/'
        },
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
            ease: "power4.in",
            onComplete: () => {
                this.renderData()
            },
        })

        timeline.fromTo(project, {
            x: width * enter,
        }, {
            x: 0,
            ease: "power4.out",
            onComplete: () => {
                removeClass(controls, "disabled")
                this.animating = false
                timeline.kill()
                // this.carousel.timeScale(1)
            },
        })
    }

    private renderData() {
        innerText(".project-title", this.project.title)
        innerHTML(".project-cateogry", this.project.category)
        innerHTML(".project-desc", this.project.description)
        if (this.project.url) {
            applyStyles(".project-link", { display: "flex" })
            elem(".project-link").setAttribute("href", this.project.url || "")
        } else {
            applyStyles(".project-link", { display: "none" })
        }
    }
}