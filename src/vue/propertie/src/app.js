import Ipc from './lib/ipc'
import BrushBit from './lib/brush_bit'

import Propertie from './propertie'

import Util from '../util/util'
import CustomFileReader from './lib/file_reader'

export default class App extends Propertie {
  constructor() {
    super()
    this.ipc       = new Ipc()
    this.converter = new BrushBit()
    this.util      = new Util()
  }

  fileReader() { return new CustomFileReader(this) }
}