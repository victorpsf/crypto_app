import ConfigWindow from '../config/index.js'
import { 
    isTest, 
    webPackDevServerUrlExists, 
    webPackDevServerUrl
} from '../src/assets'
import { LoadUrl } from './app_load'
import { autoUpdater } from 'electron-updater'

export default async function createWindow(BrowserWindow) {
    // Create the browser window.
    const window = new BrowserWindow(ConfigWindow())

    await LoadUrl({
        win: window, 
        dev: webPackDevServerUrlExists(), 
        url: webPackDevServerUrl(),
        test: isTest()
    })

    // window
    return window
}