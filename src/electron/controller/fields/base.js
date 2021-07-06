export default class ModelField {
  constructor() {
    this.__attr__ = {
      name: '',
      field: '',
      label: '',
      value: null,
      shared: {}
    }
  }

  async get() {
    if (typeof this.__get__ !== 'function')
      return this.__attr__

    return await this.__get__()
  }

  async set(values) {
    if (typeof this.__set__ !== 'function') {
      this.__attr__.value = values[this.__attr__.field]
      return this
    }

    return this.__set__(values)
  }
}