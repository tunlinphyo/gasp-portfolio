export function setDark() {
    const root = document.body
    root.dataset.schema = 'dark'
    window.firework = true
}

export function removeDark() {
    const root = document.body
    root.dataset.schema = 'light'
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
    window.firework = prefersDarkMode.matches ? true : false
}

export function setLight() {
    const root = document.body
    root.dataset.schema = 'light'
}

export function removeLight() {
    const root = document.body
    root.dataset.schema = ''
}
