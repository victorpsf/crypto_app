import {
    ShowWindowCallback,
    WindowsListenExitCallback,
    MacListenExitCallback,
    AllWindowClosedCallback,
    StartAppCallback
} from './callbacks'

export function showWindow(window) {
    window.once('ready-to-show', ShowWindowCallback(window))
}

// Exit cleanly on request from parent process in development mode.
export function windowsListenExit(app) {
    process.on('message', WindowsListenExitCallback(app))
}

export function macListenExit(app) {
    process.on('SIGTERM', MacListenExitCallback(app))
}

// Quit when all windows are closed.
export function appListen(app) {
    app.on('window-all-closed', AllWindowClosedCallback(app))
}

export function controllerListen(app, func) {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', StartAppCallback('activate', func))

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', StartAppCallback('ready', func))
}