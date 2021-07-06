import MinOffSet from './min_offset'
import StartOffSet from './start_offset'
import Preferences from './preferences'
import StartPosition from './start_position'
import Icon from './icon'

export default function () {
    let args = [ MinOffSet, StartOffSet, Preferences, StartPosition, Icon ]
    let config = {}

    for(let arg of args) config = Object.assign(config, arg)
    return config
}