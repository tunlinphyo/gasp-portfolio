import { initializeApp } from "firebase/app"
import { Analytics, getAnalytics, logEvent, setUserId, setConsent } from "firebase/analytics"
import { v4 as uuidv4 } from "uuid"
import { UserConsent } from "./cookie-consent"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${import.meta.env.VITE_PROJECT_ID}.firebaseio.com`,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: `${import.meta.env.VITE_PROJECT_ID}.firebasestorage.app`,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASURMENT_ID
}

const app = initializeApp(firebaseConfig)

export class FirebaseAnalytics {
    private analytics: Analytics | undefined
    private userConsent: UserConsent
    private userId: string | null

    constructor() {
        this.userConsent = localStorage.getItem("userConsent") as UserConsent || "denied"
        this.userId = localStorage.getItem("userId")

        const isGranted = this.userConsent === "granted"
        this.setConsent(isGranted)
    }

    public updateUserConsent(consent: UserConsent): void {
        this.userConsent = consent
        const isGranted = this.userConsent === "granted"
        this.setConsent(isGranted)
    }

    public trackEvent(eventName: string, eventParams?: { [key: string]: any }): void {
        // logEvent(this.analytics, eventName, eventParams)
        const analytics = getAnalytics()
        logEvent(analytics, eventName, eventParams)
    }

    private setConsent(isConsent: boolean = true) {
        if (!this.analytics && isConsent) {
            this.analytics = getAnalytics(app)
        }

        if (isConsent && this.analytics) {
            setConsent({
                ad_storage: isConsent ? "granted" : "denied",
                analytics_storage: isConsent ? "granted" : "denied"
                // analytics_storage: "granted"
            })

            if (!this.userId && isConsent) {
                this.userId = uuidv4()
                localStorage.setItem("userId", this.userId)
            }
            setUserId(this.analytics, isConsent ? this.userId : null)
        }
    }
}