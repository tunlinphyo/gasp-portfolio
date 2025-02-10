export class Utils {
    public static trackLinksClick() {
        document.addEventListener("click", (event) => {
            const target = event.target as HTMLElement
            if (target.tagName === "A" && target.hasAttribute("data-link")) {
                window.umami.track('Link', { target: target.dataset.link })
            }
        })
    }

    public static trackContactClick() {
        const contacts = document.querySelector('.contacts') as HTMLElement
        contacts.addEventListener("click", (event) => {
            const target = event.target as HTMLElement
            if (target.tagName === "A" && target.hasAttribute("data-contact")) {
                window.umami.track('Contact', { target: target.dataset.contact })
            }
        })
    }

    public static animateHoverElemets() {
        const hoverEls = document.querySelectorAll('.cursor--hover') as NodeListOf<HTMLElement>
        hoverEls.forEach((elem) => {
            elem.addEventListener("mousemove", (e: MouseEvent) => {
                const rect = elem.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                elem.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, var(--l-2) 0px, transparent 30px)`
            })

            elem.addEventListener("mouseleave", () => {
                elem.style.backgroundImage = "none"
            })
        })
    }
}