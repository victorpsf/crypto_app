import BaseField from './base'

export default class TextField extends BaseField {
  constructor(label, field) {
    super()

    this.__attr__.name  = 'text-field'
    this.__attr__.label = label
    this.__attr__.field = field

    this.__attr__.shared.type = 'text'
  }

  type(type) {
    this.__attr__.shared.type = type
    return this
  }

  maxLength(value) {
    this.__attr__.shared.maxLength = value
    return this
  }

  static make(label, field) {
    return new TextField(label, field)
  }
}