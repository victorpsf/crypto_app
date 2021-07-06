import Base from './base'

class Config extends Base {
  constructor(arg) {
    super(arg)
  }

  async get() { }

  async post() {}

  async put() {}

  async delete() {}
}

const handler = function (method) {
  return (...args) => { return Config.instance.apply(null, args)[method]() }
}

export default {
  '/key:[GET]':    handler('get'),
  '/key:[POST]':   handler('post'),
  '/key:[PUT]':    handler('put'),
  '/key:[DELETE]': handler('delete')
}