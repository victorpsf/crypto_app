const { ipcRenderer } = window.require('electron')

export default class Ipc {
  constructor() {
    this.__listen__ = {
      responseListen: 'render-process',
      requestListen: 'main-process',
      awaitResponse: { },
      timeOut: {
        scale: 'sec',
        time: 12
      },
      max_pids: 9999999
    }

    this.listen()
  }

  /**
   * get milliseconds timeout
   * 
   * @returns Number
   */
  getMillisecondsTimeOut() {
    let { scale, time } = this.__listen__.timeOut

    const convert = function (scale, time) {
      switch (scale) {
        case 'sec': return convert('mil', time * 1000)
        case 'min': return convert('sec', time * 60)
        case 'hr':  return convert('min', time * 60)
        case 'mil': return time
        default:    return 12000
      }
    }

    return convert(scale, time)
  }

  /**
   * @param {*} pid 
   * 
   *  check if time is exchenged
   * 
   * @returns 
   */
  async verifyTimeOut(pid) {
    let { time, reject } = this.getRequest(pid)

    let currentTime = new Date()
    let requestTime = new Date(time)

    requestTime.setMilliseconds(requestTime.getMilliseconds() + this.getMillisecondsTimeOut())

    if (currentTime >= requestTime) {
      this.unsetRequest(pid)
      return reject({ pid, status: 'error', message: 'request: timeout', data: null })
    }
  }

  /**
   *  return pids
   * 
   * @returns [String, ...String]
   */
  __pids__() {
    return Object.keys(this.__listen__.awaitResponse)
  }

  /**
   * @param {*} min 
   * @param {*} max 
   * 
   *  get rand number
   * 
   * @returns Number
   */
  __rand__(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * @param {Array} args 
   * @param {any} value 
   * 
   *  check if array contains value
   * 
   * @returns Boolean
   */
  __in__(args = [], value) {
    return args.indexOf(value) >= 0
  }

  /**
   * get pid
   * 
   * @returns new Pid
   */
  __pid__() {
    let bool = true
    let rand = null

    while(bool) {
      let pids = this.__pids__()
        rand = this.__rand__(0, this.__listen__.max_pids)
        rand = ('00000000' + rand.toString(16)).slice(-6)
  
      bool = this.__in__(pids, rand)
    }

    return rand
  }

  /**
   * @param {*} args
   * 
   * validate data
   * 
   * @returns any
   */
  validate(args) {
    let props = ['url', 'method', 'data']
    let attr  = {
      url: 'string',
      method: 'string',
      data: 'object'
    },
      methods = ['get', 'post', 'put', 'delete']

    for(let key of props)
      switch (key) {
        case 'url':
          if (attr[key] !== typeof args[key]) throw `${key} is not type ${attr[key]}`
          break
        case 'method':
          if (attr[key] !== typeof args[key])    throw `${key} is not type ${attr[key]}`
          if (!this.__in__(methods, args[key].toLowerCase())) throw `invalid method ${args[key]}`
          args[key] = args[key].toUpperCase()
          break
        case 'data':
          if (attr[key] !== typeof args[key]) args[key] = {}
          break;
      }

    return args
  }

  /**
   * @param {*} date 
   * 
   *  get timestamp
   * 
   * @returns 
   */
  currentTime(date = new Date()) {
    return date.getTime()
  }


  /**
   * @param {*} args 
   * 
   */
  callMain(args) {
    ipcRenderer.send(this.__listen__.requestListen, args)
  }

  setAndGetRequestData({ pid, time, resolve, reject, url, method, data }) {
    this.setRequest(pid, { time, resolve, reject })
    return { pid, call: `${url}:[${method}]`, data: Object.assign({}, data) }
  }

  setRequest(pid, data) {
    this.__listen__.awaitResponse[pid] = data
  }

  unsetRequest(pid) {
    delete this.__listen__.awaitResponse[pid]
  }

  getRequest(pid) {
    return this.__listen__.awaitResponse[pid] || null
  }

  request(args = { url: undefined, method: undefined, data: undefined }) {
    return new Promise((resolve, reject) => {
      try {
        args = this.validate(args)
        args = this.setAndGetRequestData({ 
          pid: this.__pid__(),
          time: this.currentTime(),
          resolve,
          reject,
          ...args
        })

        this.callMain(args)
      } catch (error) { console.error(error); return reject({ message: error }) }
    })

  }

  listen() {
    ipcRenderer.on(this.__listen__.responseListen, (event, args) => {
      let { original: { pid }, response } = args
      let { resolve, reject } = this.getRequest(pid)

      try {
        let { status } = response
        this.unsetRequest(pid)
        if (status === 'error') throw args.response
        return resolve({ pid, ...args.response })
      } catch (error) { return reject({ pid, error: error }) }
    })
    
    setInterval(() => {
      for(let pid of this.__pids__())
        this.verifyTimeOut(pid)
    }, 1000)
  }
}