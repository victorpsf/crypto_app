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

  __pids__() {
    return Object.keys(this.__listen__.awaitResponse)
  }

  __rand__(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  __in__(args = [], value) {
    return args.indexOf(value) >= 0
  }

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

  validate(type, data) {
    switch (type) {
      case 'url':
        if (typeof data !== 'string') throw 'url is not string'
        return data
      case 'method':
        let methods = ['get', 'post', 'put', 'delete']

        if (!this.__in__(methods, data.toLowerCase())) throw 'method is not exists'
        return data.toUpperCase()
      case 'data':
        return typeof data === 'object'? data: {}
    }
  }

  currentTime(date = new Date()) {
    return date.getTime()
  }

  callMain(args) {
    ipcRenderer.send(this.__listen__.requestListen, args)
  }

  setRequest(pid, props, args) {
    this.__listen__.awaitResponse[pid] = { ...props, ...args }
    return { pid, ...args };
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
        for(let key of ['url', 'method', 'data'])
          args[key] = this.validate(key, args[key] || null)

        args = this.setRequest(this.__pid__(), { time: this.currentTime(), resolve, reject }, args)
        this.callMain(args)
      } catch (error) {
        return reject({ message: error })
      }
    })

  }

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

  listen() {
    ipcRenderer.on(this.__listen__.responseListen, (event, args) => {
      let { original: { pid }, response: { status } } = args

      let { resolve, reject } = this.getRequest(pid)

      try {
        this.unsetRequest(pid)
        if (status === 'error') throw args.response
        return resolve({ pid, ...args.response })
      } catch (error) { return reject({ pid, ...error }) }
    })
    
    setInterval(() => {
      for(let pid of this.__pids__())
        this.verifyTimeOut(pid)
    }, 1000)
  }
}