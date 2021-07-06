import Handle from './handle'

export default function (app, ipcMain) {
    const mainProcess = function (event, args) {
        Handle(args)
            .then(function (result) { event.reply('render-process', result) })
            .catch(function (error) { event.reply('render-process', error) })
    }

    ipcMain.on('main-process', mainProcess)
}