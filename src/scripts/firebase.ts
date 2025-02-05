import { initializeApp } from "firebase/app"
import { getAnalytics, logEvent } from "firebase/analytics"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${import.meta.env.VITE_PROJECT_ID}.firebaseio.com`,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: `${import.meta.env.VITE_PROJECT_ID}.firebasestorage.app`,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASURMENT_ID,
}

const app = initializeApp(firebaseConfig)
let analytics: any

export function initAnalytics() {
    if (localStorage.getItem("userConsent") === "accepted") {
        analytics = getAnalytics(app)
        trackEvent("page_view", { page: "/" })
    }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
    if (analytics) {
        console.log('TRACK', analytics, eventName, params)
        logEvent(analytics, eventName, params)
    }
}