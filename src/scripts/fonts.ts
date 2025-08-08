export function loadGoogleFont(family: string, weights = '400') {
    return new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights}&display=swap`;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error('Google Font failed to load'));
        document.head.appendChild(link);
    })
}
