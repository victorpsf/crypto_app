import { ipcMain } from 'electron'
import Handle from './src/handle/index'

ipcMain.on('main-process', function (event, args) {
  Handle(args)
    .then(function (result) {
      event.reply('render-process', result)
    })
    .catch(function (error) {
      event.reply('render-process', error)
    })
})
