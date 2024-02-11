import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: true
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, '/index.html'),
                // yomiuri: resolve(__dirname, '/yomiuri/index.html'),
            },
        },
    },
})