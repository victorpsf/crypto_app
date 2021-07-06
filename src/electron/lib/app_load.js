import { buildUrl } from '../config/build'

export async function LoadUrl ({ win, dev, url, test }) {

    // Load the url of the dev server if in development mode
    if (dev) {
        await win.loadURL(url)
        if (test) LoadDevTools(win)
        return
    }

    // Load the index.html when not in development
    buildUrl()
        .createProtocol()
        .loadURL()
}

export function LoadDevTools(win) {
    win.webContents.openDevTools()
}