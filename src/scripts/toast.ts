import { elem } from "./helpers/utils"


export class Toast {
    private toast: HTMLElement
    // private timeout: NodeJS.Timeout | null = null;

    public static PLAY_PAUSE = `Press <span class="key">K</span> to play and pause.`
    public static GO_CONTACT = `Press <span class="key">C</span> to goto contact.`
    public static GO_TOP = `Press <span class="key">T</span> to goto top.`
    public static PREV_NEXT = `Press <span class="key">&#8592;</span> and <span class="key">&#8594;</span> to go previouse and next projects.`

    constructor() {
        this.toast = elem('.toast')
    }

    show(message: string) {
        // if (this.timeout) {
        //     clearTimeout(this.timeout)
        //     this.hide()
        // }
        this.toast.innerHTML = message
        this.toast.classList.add('show')
        // this.timeout = setTimeout(() => {
        //     this.hide()
        // }, time)
    }

    hide() {
        this.toast.classList.remove('show')
    }
}