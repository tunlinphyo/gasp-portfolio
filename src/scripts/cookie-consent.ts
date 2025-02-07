import { FirebaseAnalytics } from "./firebase"

export type UserConsent = "granted" | "denied" | null

export class CookieConsent {
    private consentKey = "userConsent"
    private bannerShowed = false

    constructor(private firebase: FirebaseAnalytics) {
        this.initCookieConsent()
    }

    private initCookieConsent(): void {
        const consent = localStorage.getItem(this.consentKey)

        if (consent !== null) {
            this.removeBanner(true)
        } else {
            this.showCookieConsent()
        }
    }

    private showCookieConsent(): void {
        const consent = localStorage.getItem(this.consentKey)

        if (consent === null && !this.bannerShowed) {
            this.showConsentBanner()
            this.bannerShowed = true
        }
    }

    private showConsentBanner(): void {
        document.getElementById("allowCookie")?.addEventListener("click", () => {
            this.setConsent("granted")
        })

        document.getElementById("declineCookie")?.addEventListener("click", () => {
            this.setConsent("denied")
        })
    }

    private async setConsent(consent: UserConsent): Promise<void> {
        localStorage.setItem(this.consentKey, consent as string)
        this.removeBanner()
        await this.firebase.updateUserConsent(consent)
    }

    private removeBanner(noAnimation: boolean = false): void {
        const cookieBanner = document.getElementById("cookieBanner")

        if (!cookieBanner) return
        if (noAnimation) return cookieBanner.remove()

        cookieBanner.style.transition = "translate .3s ease"
        cookieBanner.style.translate = "0 110%"

        cookieBanner.addEventListener("transitionend", () => {
            cookieBanner.remove()
        })
    }
}