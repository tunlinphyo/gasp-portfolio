export class BrowserCheck {
    static isComputerBrowser(): boolean {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        // Check common mobile devices
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

        return !mobileRegex.test(userAgent);
    }

    static runIfComputerBrowser(callback: () => void): void {
        if (this.isComputerBrowser()) {
            callback();
        } else {
            console.warn('This functionality is only available on computer browsers.');
        }
    }
}
