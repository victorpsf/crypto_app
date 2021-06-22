import Fs from 'fs'
import Path from 'path'

export default class Storage {
  constructor() {
    this.__main_dir__  = 'crypto_app'
    this.__data_file__ = 'history.json'
    this.__dirs__     = ['generated', 'encrypted', 'hashed']
  }

  /**
   * @param {*} path 
   * 
   * read directory files
   * 
   * @returns 
   */
  readDir(path) {
    return Fs.readdirSync(path, { encoding: 'utf-8' })
  }
  
  /**
   * @param {*} path 
   * 
   * create direcotory recursive: true
   */
  mkDir(path) {
    Fs.mkdirSync(path, { recursive: true })
  }

  __parser__(mode, parser, value) {
    let func = mode === 'w' ? JSON.stringify: JSON.parse

    switch (parser) {
      case 'json':
        return func(value)
    }
    return value
  }

  /**
   * @param {*} path 
   * @param {*} value 
   * 
   * write file in path
   */
  write(path, value, parser) {
    value = this.__parser__('w', parser, value)

    Fs.writeFileSync(path, value, { encoding: 'utf-8' })
  }

  /**
   * @param {*} path 
   * 
   * delete file path
   */
  delete(path) {
    Fs.unlinkSync(path)
  }

  /**
   * @param {*} path 
   * 
   * read file in path
   */
  read(path, parser) {
    let value = Fs.readFileSync(path, { encoding: 'utf-8' })

    return this.__parser__('r', parser, value)
  }

  /**
   * @param {*} path 
   * 
   * information of file or path
   * 
   * @returns 
   */
  stat(path) {
    return Fs.statSync(path)
  }

  __in__(array, value) {
    return array.indexOf(value) >= 0
  }

  __join_path__(...args) {
    return Path.join.apply(null, args)
  }

  __paths__(name, ...args) {
    switch (name) {
      case 'app':
        return this.__join_path__.apply(
          this, [this.__paths__('main'), this.__main_dir__].concat(args)
        )
      case 'generate':
      case 'encrypted':
      case 'hashed':
        return this.__join_path__.apply(
          this, [this.__paths__('app'), name].concat(args)
        )
      case 'main':
      default:
        return this.__join_path__.apply(
          this, ['./'].concat(args)
        )
    }
  }

  directoryFilter(path, value, index, array) {
    let stat = this.stat(this.__join_path__(path, value))
    return stat.isDirectory()
  }

  load() {
    let mainPaths = this.readDir(this.__paths__('main'))
                        .filter((...args) => this.directoryFilter.apply(
                          this, [this.__paths__('main')].concat(args)
                        ))

    if (!this.__in__(mainPaths, this.__main_dir__))
      this.mkDir(this.__paths__('app'))

    let cryptoPaths = this.readDir(this.__paths__('app'))
    if (!this.__in__(cryptoPaths, this.__data_file__))
      this.write(this.__paths__('app', this.__data_file__), [], 'json')
    
    cryptoPaths = cryptoPaths.filter((...args) => this.directoryFilter.apply(
                                this, [this.__paths__('app')].concat(args)
                              ))

    for(let path of this.__dirs__) {
      if (this.__in__(cryptoPaths, path)) continue

      this.mkDir(this.__paths__('app', path))
    }

    return this
  }

  static load() {
    return (new this()).load()
  }
}