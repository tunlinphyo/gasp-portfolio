interface CSSProperties {
    display?: string;
    backgroundColor?: string;
    height?: string;
    zIndex?: number;
    left?: string;
    right?: string;
    translate?: string;
    content?: string;
    transition?: string;
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

export function hasCursorNoneAncestor(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    return target.closest('.cursor--none') !== null || hasClass(target, 'cursor--none');
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

export function updateInert<T extends HTMLElement>(selector: T | string, shouldInert: boolean = true, parent?: HTMLElement): void {
    const element = elem<T>(selector, parent)
    if (shouldInert) {
        element.setAttribute("inert", "")
    } else {
        element.removeAttribute("inert")
    }
}

export function isVisibleHeadingElement(element: HTMLElement): boolean {
    const isHeading = /^(H[1-6])$/i.test(element.tagName);
    const style = getComputedStyle(element);
    const isVisible = style.opacity !== "0";

    return isHeading && isVisible;
  }


export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: any

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

export function supportsTouch() {
    return 'ontouchstart' in window || !!navigator.maxTouchPoints;
}

export function wait(delay: number = 300): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => resolve(), delay)
    })
}
