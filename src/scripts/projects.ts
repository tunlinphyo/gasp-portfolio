import gsap from "gsap"
// import { addClass, applyStyles, elem, innerHTML, innerText, removeClass, dataSet } from './helpers/utils';
import { Utils } from './utils';
import { ReducedMotionListener } from "./reduce-motion";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    url?: string;
}

export class Projects {
    protected readonly projects: Project[]
    protected currentIndex: number = 0
    protected animating: boolean = false
    constructor() {
        this.projects = this.getPorjects()
        this.subscribe()
        this.renderData()
    }

    get rect() {
        return Utils.elem(".projects").getBoundingClientRect()
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
        Utils.elem(".control.previous").addEventListener("click", () => {
            console.log('PREV')
            this.renderProject("previous")
        })
        Utils.elem(".control.next").addEventListener("click", () => {
            this.renderProject("next")
        })
    }

    public renderProject(action: "previous" | "next") {
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

        const controls = Utils.elem(".projectFooter")

        const timeline = gsap.timeline()

        const leave = isNext ? -1 : 1
        const enter = isNext ? 1 : -1

        if (ReducedMotionListener.isReduced()) {
            this.renderData()
        } else {
            Utils.addClass(controls, "disabled")
            this.animating = true

            const project = Utils.elem(".projects .project")
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
                    Utils.removeClass(controls, "disabled")
                    this.animating = false
                    timeline.kill()
                    // this.carousel.timeScale(1)
                },
            })
        }
    }

    private renderData() {
        Utils.innerText(".project-heading", this.project.title)
        Utils.innerHTML(".project-label", this.project.category)
        Utils.innerHTML(".project-description", this.project.description)
        Utils.innerHTML(".projectNumber", `${String(this.projects.indexOf(this.project) + 1).padStart(2, '0')}`)
        if (this.project.url) {
            Utils.applyStyles(".project-link", { display: "flex" })
            Utils.elem(".project-link").setAttribute("href", this.project.url)
            Utils.dataSet(Utils.elem(".project-link"), { link: this.project.title })
        } else {
            Utils.applyStyles(".project-link", { display: "none" })
        }
        window.umami.track('Project', { name: this.project.title })
    }

    private getPorjects() {
        const project = Utils.elem<HTMLOListElement>('.projects-list')
        const items = Utils.elems<HTMLLIElement>('li', project)

        const list: Project[] = []
        items.forEach((item, id) => {
            const [title, url] = this.getTitleAndLink(item)
            const data: Project = {
                id,
                title,
                category: this.getCategory(item),
                description: this.getDescription(item),
                url
            }
            list.push(data)
        })

        return list
    }

    private getTitleAndLink(elem: HTMLElement) {
        const title = Utils.elem('h3', elem)
        const aTag = Utils.elem<HTMLAnchorElement>('a', title)

        if (aTag) {
            return [aTag.textContent || '', aTag.href]
        } else {
            return [title.textContent || '', '']
        }
    }

    private getCategory(elem: HTMLElement) {
        const tag = Utils.elem('small[role="note"]', elem)

        return tag.textContent || ''
    }

    private getDescription(elem: HTMLElement) {
        const pTag = Utils.elem('p', elem)

        return pTag.innerHTML || ''
    }
}