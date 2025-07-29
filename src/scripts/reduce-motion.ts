export class ReducedMotionListener {
    private mediaQuery: MediaQueryList
    private listeners: Array<(isReduced: boolean) => void> = []

    constructor() {
        this.mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

        this.handleChange = this.handleChange.bind(this)
        this.mediaQuery.addEventListener("change", this.handleChange)
    }

    public listen(callback: (isReduced: boolean) => void): void {
        this.listeners.push(callback)
    }

    public static isReduced() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    private handleChange(event: MediaQueryListEvent) {
        for (const callback of this.listeners) {
            callback(event.matches)
        }
    }

    public destroy(): void {
        this.mediaQuery.removeEventListener("change", this.handleChange)
        this.listeners = []
    }
}