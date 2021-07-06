import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export function buildUrl() {
    return {
        protocol: 'app',
        path: './index.html',


        createProtocol() {
            createProtocol(this.protocol)
            return this
        },
        loadURL() {
            return `${this.protocol}://${this.path}`
        }
    }
}