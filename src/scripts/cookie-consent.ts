import { initAnalytics } from "./firebase"

let bannerShowed: boolean = false

export function initCookieConsent() {
    const consentKey = "userConsent"
    const consent = localStorage.getItem(consentKey)

    if (consent === "accepted") {
        initAnalytics()
    }
    if (consent != null) {
        removeBanner(true)
    }
}

export function showCookieConsent() {
    const consentKey = "userConsent"
    const consent = localStorage.getItem(consentKey)

    if (consent === null && !bannerShowed) {
        showConsentBanner()
        bannerShowed = true
    }
}

function showConsentBanner() {
    document.getElementById("allowCookie")?.addEventListener("click", () => {
        localStorage.setItem("userConsent", "accepted")
        removeBanner()
        initAnalytics()
    });

    document.getElementById("declineCookie")?.addEventListener("click", () => {
        localStorage.setItem("userConsent", "rejected")
        removeBanner()
    });
}

function removeBanner(noAnimation: boolean = false) {
    const cookieBanner = document.getElementById("cookieBanner")

    if (!cookieBanner) return
    if (noAnimation) return cookieBanner.remove()

    cookieBanner.style.transition = 'translate .3s ease'
    cookieBanner.style.translate = '0 110%'

    cookieBanner.addEventListener('transitionend', () => {
        cookieBanner.remove()
    })
}