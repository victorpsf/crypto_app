import MyEvent from '../event'
import Base from '../app'
import Util from '../../util/util'

export default class CustomFileReader extends MyEvent {
  constructor(file = new File([], ''), main = new Base()) {
    super()

    this.__src__ = {
      video: {
        "name": "video-camera.svg",
        "size": 1035,
        "type": "image/svg+xml",
        "src": "data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDY3Ljk2OCA0NjcuOTY4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NjcuOTY4IDQ2Ny45Njg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjY0LjcwNCw5Ni41MTJINTEuMmMtMjguMTYsMC01MS4yLDIzLjA0LTUxLjIsNTEuMnYxNzIuNTQ0YzAsMjguMTYsMjMuMDQsNTEuMiw1MS4yLDUxLjJoMjEzLjUwNA0KCQkJYzI4LjE2LDAsNTEuMi0yMy4wNCw1MS4yLTUxLjJWMTQ3LjcxMkMzMTUuOTA0LDExOS4wNCwyOTIuODY0LDk2LjUxMiwyNjQuNzA0LDk2LjUxMnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQzMC4wOCwxMjQuNjcyYy0zLjA3MiwwLjUxMi02LjE0NCwyLjA0OC04LjcwNCwzLjU4NGwtNzkuODcyLDQ2LjA4VjI5My4xMmw4MC4zODQsNDYuMDgNCgkJCWMxNC44NDgsOC43MDQsMzMuMjgsMy41ODQsNDEuOTg0LTExLjI2NGMyLjU2LTQuNjA4LDQuMDk2LTkuNzI4LDQuMDk2LTE1LjM2VjE1NC4zNjgNCgkJCUM0NjcuOTY4LDEzNS40MjQsNDUwLjA0OCwxMjAuMDY0LDQzMC4wOCwxMjQuNjcyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
      },
      audio: {
        "name": "speaker-filled-audio-tool.svg",
        "size": 1954,
        "type": "image/svg+xml",
        "src": "data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjkzLjAzOHB4IiBoZWlnaHQ9IjkzLjAzOHB4IiB2aWV3Qm94PSIwIDAgOTMuMDM4IDkzLjAzOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOTMuMDM4IDkzLjAzODsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTQ2LjU0Nyw3NS41MjFjMCwxLjYzOS0wLjk0NywzLjEyOC0yLjQyOSwzLjgyM2MtMC41NzMsMC4yNzEtMS4xODcsMC40MDItMS43OTcsMC40MDJjLTAuOTY2LDAtMS45MjMtMC4zMzItMi42OTYtMC45NzMNCgkJbC0yMy4wOTgtMTkuMTRINC4yMjVDMS44OTIsNTkuNjM1LDAsNTcuNzQyLDAsNTUuNDA5VjM4LjU3NmMwLTIuMzM0LDEuODkyLTQuMjI2LDQuMjI1LTQuMjI2aDEyLjMwM2wyMy4wOTgtMTkuMTQNCgkJYzEuMjYyLTEuMDQ2LDMuMDEyLTEuMjY5LDQuNDkzLTAuNTY5YzEuNDgxLDAuNjk1LDIuNDI5LDIuMTg1LDIuNDI5LDMuODIzTDQ2LjU0Nyw3NS41MjFMNDYuNTQ3LDc1LjUyMXogTTYyLjc4NCw2OC45MTkNCgkJYy0wLjEwMywwLjAwNy0wLjIwMiwwLjAxMS0wLjMwNCwwLjAxMWMtMS4xMTYsMC0yLjE5Mi0wLjQ0MS0yLjk4Ny0xLjIzN2wtMC41NjUtMC41NjdjLTEuNDgyLTEuNDc5LTEuNjU2LTMuODIyLTAuNDA4LTUuNTA0DQoJCWMzLjE2NC00LjI2Niw0LjgzNC05LjMyMyw0LjgzNC0xNC42MjhjMC01LjcwNi0xLjg5Ni0xMS4wNTgtNS40ODQtMTUuNDc4Yy0xLjM2Ni0xLjY4LTEuMjQtNC4xMiwwLjI5MS01LjY1bDAuNTY0LTAuNTY1DQoJCWMwLjg0NC0wLjg0NCwxLjk3NS0xLjMwNCwzLjE5OS0xLjIzMWMxLjE5MiwwLjA2LDIuMzA1LDAuNjIxLDMuMDYxLDEuNTQ1YzQuOTc3LDYuMDksNy42MDYsMTMuNDg0LDcuNjA2LDIxLjM4DQoJCWMwLDcuMzU0LTIuMzI1LDE0LjM1NC02LjcyNSwyMC4yNEM2NS4xMzEsNjguMjE2LDY0LjAwNyw2OC44MzIsNjIuNzg0LDY4LjkxOXogTTgwLjI1Miw4MS45NzYNCgkJYy0wLjc2NCwwLjkwMy0xLjg2OSwxLjQ0NS0zLjA1MiwxLjQ5NWMtMC4wNTgsMC4wMDItMC4xMTcsMC4wMDQtMC4xNzcsMC4wMDRjLTEuMTE5LDAtMi4xOTMtMC40NDItMi45ODgtMS4yMzdsLTAuNTU1LTAuNTU1DQoJCWMtMS41NTEtMS41NS0xLjY1Ni00LjAyOS0wLjI0Ni01LjcwN2M2LjgxNC04LjEwNCwxMC41NjgtMTguMzk2LDEwLjU2OC0yOC45ODJjMC0xMS4wMTEtNC4wMTktMjEuNjExLTExLjMxNC0yOS44NDcNCgkJYy0xLjQ3OS0xLjY3Mi0xLjQwNC00LjIwMywwLjE3LTUuNzgzbDAuNTU0LTAuNTU1YzAuODIyLTAuODI2LDEuODktMS4yODEsMy4xMTUtMS4yNDJjMS4xNjMsMC4wMzMsMi4yNjMsMC41NDcsMy4wMzYsMS40MTcNCgkJYzguODE4LDkuOTI4LDEzLjY3NSwyMi43MTgsMTMuNjc1LDM2LjAxQzkzLjA0LDU5Ljc4Myw4OC40OTksNzIuMjA3LDgwLjI1Miw4MS45NzZ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
      },
      file: {
        "name": "files.svg",
        "size": 891,
        "type": "image/svg+xml",
        "src": "data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00NTkuMzYsMTAwLjY0bC05Ni05NkMzNjAuMzQxLDEuNjQ1LDM1Ni4yNTMtMC4wMjQsMzUyLDBIOTZjLTI2LjUxLDAtNDgsMjEuNDktNDgsNDh2NDE2YzAsMjYuNTEsMjEuNDksNDgsNDgsNDhoMzIwDQoJCQljMjYuNTEsMCw0OC0yMS40OSw0OC00OFYxMTJDNDY0LjAyNSwxMDcuNzQ3LDQ2Mi4zNTUsMTAzLjY2LDQ1OS4zNiwxMDAuNjR6IE00MzIsNDY0YzAsOC44MzctNy4xNjMsMTYtMTYsMTZIOTYNCgkJCWMtOC44MzcsMC0xNi03LjE2My0xNi0xNlY0OGMwLTguODM3LDcuMTYzLTE2LDE2LTE2aDI0MHY2NGMwLDE3LjY3MywxNC4zMjcsMzIsMzIsMzJoNjRWNDY0eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
      }
    }

    this._file_ = file
    this._main_ = main
  }

  /**
   * @param {*} file 
   * 
   *  get default file info
   * 
   * @returns {
   *   name         -> file name,
   *   size         -> file size,
   *   type         -> file [mime-type],
   *   lastModified -> timestamp
   * }
   */
  _file_info_() {
    return {
      name         : this._file_.name,
      size         : this._file_.size,
      type         : this._file_.type,
      lastModified : this._file_.lastModified
    }
  }

  static validate_model(data) {
    let validator = {
      name: {
        type: 'string',
        regexp: /.*/g
      },
      size: {
        type: 'number',
        regexp: /^(\d+)$/g
      },
      type: {
        type: 'string',
        regexp: /^(.+\/.+)$/g
      },
      data: {
        type: 'object',
        value: {
          format: {
            type: 'string',
            values: ['hex', 'base64', 'utf-8']
          },
          value: {
            type: 'string'
          }
        }
      }
    }, validated = true,
       util = new Util();

    if ("object" !== typeof data)
      throw "error: invalid format model is not object"

    if (data instanceof Array && Array.isArray(data)) {
      for(let _data_ of data)
        validated = this.validate_model(_data_)
      return validated;
    }

    if (
      !util.value_is(data.name, { types: [validator.name.type] })
    ) return false
    if (
      !util.value_is(data.size, { types: [validator.size.type] }) ||
      !validator.name.regexp.test(data.size)
    ) return false
    if (
      !util.value_is(data.type, { types: [validator.type.type] }) ||
      !validator.name.regexp.test(data.type)
    ) return false
    if (
      !util.value_is(data.data, { types: [validator.data.type] })
    ) return false
    if (
      !util.value_is(data.data.format, { types: [validator.data.value.format.type] })
    ) return false
    if (
      !util.in_array(validator.data.value.format.values, data.data.format)
    ) return false
    if (
      !util.value_is(data.data.value, { types: [validator.data.value.value.type] })
    ) return false

    return validated
  }

  _get_src_(args) {
    let { buffer, mime = '' } = args || {},
        type = 'file'

    /**
     * if image mime-type
     * 
     * verify if buffer is instance of arraybuffer
     * return base64 image if is instance of arraybuffer
     */
    if (/image\/.+/g.test(mime)) {
      if (
        typeof buffer === 'object' || 
        !(buffer instanceof ArrayBuffer)
      ) {
        let base64 = this._main_.converter.bufferToBase64(buffer)
        return `data:${mime};base64, ${base64}`
      }
      
      type = 'file'
    }
    else if (/audio\/.+/g.test(mime)) 
      type = 'audio'
    else if (/video\/.+/g.test(mime))
      type = 'video'
    
    return this.__src__[type].src
  }

  _percent_(event = new ProgressEvent('')) {
    let percent = Math.round((event.loaded / event.total) * 100)
    return {
      numeric: percent,
      text: `${percent}%`
    } 
  }

  emitEvent(data) { this.emit('file-reader', data) }
  listen(callback) { this.on('file-reader', callback) }

  readToEvents({
    fileReader = new FileReader(),
    info, 
    encoding = 'hex',
    src = false,
    resolve
  }) {
    fileReader.onerror = (event) => this.emitEvent({ event, type: 'error', error: event.target.error, file: info })
    fileReader.onload  = (event) => this.emitEvent({ event, type: 'start', file: info })
    fileReader.onprogress = (event) => this.emitEvent({ event, type: 'progress', file: ((info.percent = this._percent_(event)) && (info)) })
    fileReader.onabort = (event) => this.emitEvent({ event, type: 'abort', file: info })
    fileReader.onloadend = (event) => {
      let buffer = event.target.result

      if ('percent' in info) delete info.percent
      info.data = this._main_.converter.bufferTo(buffer, encoding)
      if (src) info.src = this._get_src_({ buffer, mime: info.type })

      this.emitEvent({ event, type: 'end', file: info })
      return resolve(info)
    }
  }

  readFile(options) {
    return new Promise((resolve) => {
      try {
        let { encoding = 'hex', src = false } = options || {}
    
        if (typeof encoding === 'undefined')
          encoding = 'hex'
        if (['hex', 'base64', 'utf-8'].indexOf(encoding) < 0) 
          encoding = 'hex'
        let info = this._file_info_(),
            fileReader = new FileReader()
    
        this.readToEvents({
          fileReader, info, encoding, src, resolve
        })

        fileReader.readAsArrayBuffer(this._file_)
      } catch (error) {
        this.emitEvent({ event: null, type: 'error', error, file: info })
        return resolve(null)
      }
    })
  }
}