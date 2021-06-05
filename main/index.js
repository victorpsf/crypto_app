import { ipcMain } from 'electron'
import Storage from './storage'

const storage = Storage.load()

ipcMain.on('main-process', function (event, args) {
  // event.reply('render-process', { original: args, response: { status: 'success', ...args } })
})
