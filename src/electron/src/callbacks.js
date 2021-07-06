export function ShowWindowCallback(window) {
    return () => window.show()
}

export function WindowsListenExitCallback(app) {
    return (data) => {
        switch (data) {
            case 'graceful-exit': quitApp(app); return;
        }
    }
}

export function MacListenExitCallback(app) {
    return () => quitApp(app)
}

export function AllWindowClosedCallback(app) {
    return () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        // Remove next line if you want the app not want the app to close on mac
        // if (process.platform === 'darwin') return

        quitApp(app)
    }
}

export function StartAppCallback(listen, func) {
    return () => func(listen)
}

const quitApp = (app) => app.quit();