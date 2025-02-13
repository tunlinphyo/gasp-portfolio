export class UmamiAnalytics {
    constructor(websiteSrc?: string, websiteId?: string) {
        if (websiteSrc && websiteId) this.loadScript(websiteSrc, websiteId)
    }

    private loadScript(websiteSrc: string, websiteId: string): void {
        if (document.querySelector(`script[data-website-id='${websiteId}']`)) {
            console.warn("Umami script is already loaded.")
            return
        }

        const script = document.createElement("script")
        script.defer = true
        script.src = websiteSrc
        script.setAttribute("data-website-id", websiteId)

        document.head.appendChild(script)
    }
}
