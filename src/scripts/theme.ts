import { Utils } from "./utils";

export class ThemeManager {
    private root: HTMLElement

    constructor() {
        this.root = document.body;
    }

    setDark() {
        this.root.dataset.schema = 'dark';
        window.firework = true;
    }

    removeDark() {
        this.root.dataset.schema = 'light';
        const prefersDarkMode = Utils.isMedia('(prefers-color-scheme: dark)')
        window.firework = false // prefersDarkMode
    }

    setLight() {
        this.root.dataset.schema = 'light';
    }

    removeLight() {
        this.root.dataset.schema = '';
    }
}