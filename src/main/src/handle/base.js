import Storage from '../lib/storage'

export default class Base {
  constructor({ storage = new Storage(), call, pid, data }) {
    this.storage = storage
    this.call    = call
    this.pid     = pid
    this.data    = data
  }

  defaultResponse(args = { message: '', status: 'error', data: {} }) {
    return {
      message: args.message || 'Default Message',
      status: args.status || 'error',
      data: args.data || {}
    }
  }

  static instance(args) {
    return new this(args)
  }
}