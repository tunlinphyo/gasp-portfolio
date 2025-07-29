export interface CSSProperties {
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

export interface DataSet {
    [name: string]: string
}

export class Utils {
    public static isMedia(query: string) {
        const media = window.matchMedia(query)
        return media.matches
    }

    public static elem<T extends HTMLElement>(selector: T | string, parent?: HTMLElement) {
        if (selector instanceof HTMLElement) return selector
        return (parent || document).querySelector(selector) as T
    }

    public static elems<T extends HTMLElement>(selector: string, parent?: HTMLElement) {
        return (parent || document).querySelectorAll(selector) as NodeListOf<T>
    }

    public static applyStyles<T extends HTMLElement>(selector: T | string, styles: CSSProperties, parent?: HTMLElement) {
        const element = this.elem<T>(selector, parent)
        Object.assign(element.style, styles)
    }

    public static hasClass<T extends HTMLElement>(selector: T | string, token: string, parent?: HTMLElement) {
        return !!(this.elem<T>(selector, parent).classList.contains(token))
    }

    public static addClass<T extends HTMLElement>(selector: T | string, token: string, parent?: HTMLElement) {
        this.elem<T>(selector, parent).classList.add(token)
    }

    public static removeClass<T extends HTMLElement>(selector: T | string, token: string, parent?: HTMLElement) {
        this.elem<T>(selector, parent).classList.remove(token)
    }

    public static toggleClass<T extends HTMLElement>(selector: T | string, token: string, force?: boolean, parent?: HTMLElement) {
        this.elem<T>(selector, parent).classList.toggle(token, force)
    }

    public static updateInert<T extends HTMLElement>(selector: T | string, shouldInert: boolean = true, parent?: HTMLElement): void {
        const element = this.elem<T>(selector, parent)
        if (shouldInert) {
            element.setAttribute("inert", "")
        } else {
            element.removeAttribute("inert")
        }
    }

    public static dataSet<T extends HTMLElement>(selector: T | string, data: DataSet, parent?: HTMLElement) {
        const element = this.elem<T>(selector, parent)
        Object.assign(element.dataset, data)
    }

    public static innerText<T extends HTMLElement>(selector: T | string, text: string, parent?: HTMLElement) {
        Utils.elem<T>(selector, parent).innerText = text
    }

    public static innerHTML<T extends HTMLElement>(selector: T | string, html: string, parent?: HTMLElement) {
        Utils.elem<T>(selector, parent).innerHTML = html
    }

    public static hasCursorNoneAncestor(target: EventTarget | null): boolean {
        if (!(target instanceof HTMLElement)) {
            return false
        }

        return target.closest('.cursor--none') !== null || this.hasClass(target, 'cursor--none')
    }

    public static wait(delay: number = 300): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => resolve(), delay)
        })
    }
}