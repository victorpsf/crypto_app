import ModelField from './base'

export default class SelectField extends ModelField {
  constructor(label, field) {
    super()

    this.__attr__.name  = 'select-field'
    this.__attr__.label = label
    this.__attr__.field = field

    this.__prot__ = {
      options: {},
    }
  }

  options(options) {
    this.__prot__.options = options
    return this
  }

  async __get__() {
    if (typeof this.__prot__.options === 'function')
      this.__prot__.options = await this.__prot__.options()
    
    this.__attr__.shared.options = this.__prot__.options
    return this.__attr__
  }

  async __set__(values) {
    let value = values[this.__attr__.field] || null
    this.__attr__.value = value
    return this
  }

  static make(label, field) {
    return new SelectField(label, field)
  }
}