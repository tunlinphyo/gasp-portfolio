export function setDark() {
    const root = document.body
    root.dataset.schema = 'dark'
}

export function removeDark() {
    const root = document.body
    root.dataset.schema = 'light'
}

export function setLight() {
    const root = document.body
    root.dataset.schema = 'light'
}

export function removeLight() {
    const root = document.body
    root.dataset.schema = ''
}
