import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { controllerListen } from '../src/listiners'
import { isDevelopment, isTest } from '../src/assets'
import createWindow from './window'

export default function (app, BrowserWindow) {
    const newWindowApp = async function (listen) {
        /**
         * listen => ['ready', 'activate']
         * 
         * ready -> start app
         * activate -> mac reactive app
         *          -> if mac is not closed app in CMD + Q
         *          -> don't activate in this app.
         *          -> read the commentary in callbacks.js function AllWindowClosedCallback 
         */

        // if (listen === 'activate' && BrowserWindow.getAllWindows().length === 0) {
        //    return await createWindow(BrowserWindow)
        // }

        if (isDevelopment() && !isTest()) {
            // Install Vue Devtools

            try {
                await installExtension(VUEJS_DEVTOOLS)
            } catch (e) {
                console.error('Vue Devtools failed to install:', e.toString())
            }
        }

        await createWindow(BrowserWindow)
    }

    controllerListen(app, newWindowApp)
}