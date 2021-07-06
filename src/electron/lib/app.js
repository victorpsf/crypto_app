import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import Privileges from '../src/privileges'
import { windowsListenExit, macListenExit, appListen } from '../src/listiners'
import AppController from './controller'
import IpcController from '../src/ipc'

Privileges(protocol)
appListen(app)
AppController(app, BrowserWindow)
IpcController(app, ipcMain)

switch (process.platform) {
    case 'win32': windowsListenExit(app); break;
    default:      macListenExit(app); break;
}
