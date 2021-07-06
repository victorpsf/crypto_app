import ConfigProperties from './config_properties'
import Fields from './fields/index'
import HashLib from '../lib/crypto/hash'

const { Builder, TextField } = Fields()

class Hash extends ConfigProperties {
  constructor(args) {
    super(args)

    this.keys = ['id', 'algorithm', 'encoding', 'hash value', 'tag', 'created at']
    this.hashPath = this.storage.__paths__('app', 'hashed')
  }

  getHash() {
    this.setCustomConfig()
    let options = {
      algorithm: this.__get__('hash-algorithm'),
      encoding: this.__get__('save-encoding')
    }

    return {
      hash: new HashLib({
        algorithm: this.__get__('hash-algorithm'),
        encoding: this.__get__('save-encoding')
      }),
      options
    }
  }

  getValuesHash(arrayValues = []) {
    let keys = []

    for (let object of arrayValues) {
      let error = false
      let value = { }

      for (let key of this.keys) {
        if (!object[key]) { error = true; break }
        value[key] = object[key]
      }

      if (error) continue
      keys.push(value)
    }

    return keys
  }

  getDateString(date = new Date()) {
    return date.toLocaleString()
  }

  getTimestamp(date = new Date()) {
    return date.getTime()
  }

  fields() {
    return [
      TextField.make('Informação', 'tag').type('text').maxLength(1000),
      TextField.make('Valor', 'value').type('password').maxLength(1000)
    ]
  }

  async get() {
    let files = this.storage.readDir(this.hashPath)
      .map((fileName) => {
        try {
          return this.storage.read(this.storage.__join_path__(this.hashPath, fileName), 'json' )
        } catch (error) { return null }
      })
      .filter(a => a !== null)

    return this.defaultResponse({
      status: 'success',
      message: 'success response hash values',
      data: {
        keys: this.keys,
        values: this.getValuesHash(files),
        fields: await Builder.build(this.fields(), {})
      }
    })
  }

  async post() {
    let { value, tag } = this.data
    let { options, hash } = this.getHash()
    let dataJSON = {
      tag,
      'hash value': hash.update(value),
      ...options,
      'created at': this.getDateString(),
      id: this.getTimestamp()
    }

    this.storage.write(
      this.storage.__join_path__(this.hashPath, dataJSON.id.toString()),
      dataJSON,
      'json'
    )

    return this.defaultResponse({
      status: 'success',
      message: 'success response hash values'
    })
  }

  async put() {}

  async delete() {
    let { id } = this.data

    this.storage.delete(this.storage.__join_path__(this.hashPath, id.toString()))
    return this.defaultResponse({
      status: 'success',
      message: 'success response hash values'
    })
  }
}

const handler = (method) => (args) => Hash.instance(args)[method]()

export default {
  '/hash:[GET]':    handler('get'),
  '/hash:[POST]':   handler('post'),
  '/hash:[PUT]':    handler('put'),
  '/hash:[DELETE]': handler('delete')
}