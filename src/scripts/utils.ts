import { FirebaseAnalytics } from "./firebase"

export class Utils {
    public static trackLinksClick(firebase: FirebaseAnalytics) {
        document.addEventListener("click", (event) => {
            const target = event.target as HTMLElement
            if (target.tagName === "A") {
                firebase.trackEvent("link_click", { link_text: target.innerText, link_url: target.getAttribute("href") })
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