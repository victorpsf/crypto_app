export default class Builder {
  constructor(fields, data) {
    this.fields = fields
    this.data   = data
  }

  async buildValues(data, fields) {
    data = (data === undefined) ? this.data : data
    fields = (fields === undefined) ? this.fields : fields

    for(let index in data) {
      let __fields__ = await this.build(data[index], fields.slice())

      data[index] = __fields__
    }

    return data
  }

  __is__(value) {
    let rule = {
      array: ([]).constructor,
      object: ({}).constructor,
      string: ('').constructor,
      number: (0).constructor,
    }

    if (value === null)                         return 'null'
    else if (value === undefined)               return 'undefined'
    else if (typeof value === 'function')       return 'function'
    else if (value.constructor === rule.array)  return 'array'
    else if (value.constructor === rule.object) return 'object'
    else if (value.constructor === rule.string) return 'string'
    else if (value.constructor === rule.number) return 'number'
    else                                        return 'unknown'
  }

  async build(data, fields) {
    data   = (data === undefined)   ? this.data : data
    fields = ((fields === undefined) ? this.fields: fields)

    if      (this.__is__(data) === 'array')  return await this.buildValues(data)
    else if (this.__is__(data) !== 'object') return []

    for(let index in fields) {
      let field = fields[index]

      field = await field.set(data)
      field = await field.get()

      fields[index] = field
    }

    return fields
  }

  static build(fields, data) {
    return (new Builder(fields, data)).build()
  }
}