import { ipcMain } from 'electron'
import Handle from './src/handle/index'

ipcMain.on('main-process', function (event, args) {
  Handle(event, args).catch(function (error) {
    event.reply('render-process', error)
  })
})
