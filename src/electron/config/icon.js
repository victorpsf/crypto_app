import { isDevelopment } from '../src/assets'

const iconConfig = {
    icon: ''
}

if (isDevelopment()) {
    iconConfig.icon = __dirname + '/icon/google.png'
} else {
    iconConfig.icon = __dirname + '/icon/electron.png'
}

export default iconConfig