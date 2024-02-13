interface CSSProperties {
    display?: string;
    backgroundColor?: string;
    height?: string;
    zIndex?: number;
    left?: string;
    right?: string;
}

interface DataSet {
    [name: string]: string
}

export function elem<T extends HTMLElement>(selector: T | string, parent?: HTMLElement) {
    if (selector instanceof HTMLElement) return selector
    return (parent || document).querySelector(selector) as T
}

export function elems<T extends HTMLElement>(selector: string, parent?: HTMLElement) {
    return (parent || document).querySelectorAll(selector) as NodeListOf<T>
}

export function innerText<T extends HTMLElement>(selector: T | string, text: string, parent?: HTMLElement) {
    elem<T>(selector, parent).innerText = text
}

export function innerHTML<T extends HTMLElement>(selector: T | string, html: string, parent?: HTMLElement) {
    elem<T>(selector, parent).innerHTML = html
}

export function hasClass<T extends HTMLElement>(selector: T | string, token: string, parent?: HTMLElement) {
    return !!(elem<T>(selector, parent).classList.contains(token))
}

export function addClass<T extends HTMLElement>(selector: T | string, token: string, parent?: HTMLElement) {
    elem<T>(selector, parent).classList.add(token)
}

export function removeClass<T extends HTMLElement>(selector: T | string, token: string, parent?: HTMLElement) {
    elem<T>(selector, parent).classList.remove(token)
}

export function toggleClass<T extends HTMLElement>(selector: T | string, token: string, force?: boolean, parent?: HTMLElement) {
    elem<T>(selector, parent).classList.toggle(token, force)
}

export function dataSet<T extends HTMLElement>(selector: T | string, data: DataSet, parent?: HTMLElement) {
    const element = elem<T>(selector, parent)
    Object.assign(element.dataset, data)
}

export function applyStyles<T extends HTMLElement>(selector: T | string, styles: CSSProperties, parent?: HTMLElement) {
    const element = elem<T>(selector, parent)
    Object.assign(element.style, styles)
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: number

    return (...args: Parameters<T>): void => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    };
}

export function getStyleValue<T extends HTMLElement>(selector: T | string, property: string, parent?: HTMLElement) {
    const element = elem<T>(selector, parent)
    const computedStyle = window.getComputedStyle(element)
    return computedStyle.getPropertyValue(property)
}

export function isMedia(query: string) {
    const media = window.matchMedia(query)
    return media.matches
}