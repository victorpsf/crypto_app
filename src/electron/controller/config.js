import Base from './base'
import Scripts from '../lib/scripts/data.json'

export class ConfigProperties extends Base {
  constructor(args) {
    super(args)
    this.configFile = 'encrypt-config.json'
    
    this.defaultConfig = {
      "hash-algorithm": 3,
      "symmetric-algorithm": 17,
      "asymmetric-algorithm": 6,
      "asymmetric-padding": 4,
      "save-encoding": 9
    }
    
    this.setCustomConfig()
  }

  setCustomConfig() {
    try {
      this.customConfig = this.storage.read(this.storage.__paths__('app', this.configFile), 'json')

      if (!this.customConfig) 
        this.customConfig = this.getCustomConfig()
    } catch (error) {
      this.customConfig = this.getCustomConfig()
    }
  }

  getCustomConfig() {
    return {
      "hash-algorithm": null,
      "symmetric-algorithm": null,
      "asymmetric-algorithm": null,
      "asymmetric-padding": null,
      "save-encoding": null
    }
  }

  hashAlg() {
    return Scripts.hash
  }

  symmetricAlg() {
    return Scripts.symmetric
  }

  asymmetricAlg() {
    return Scripts.asymmetric
  }

  asymmetricPadding() {
    return Scripts.padding
  }

  getEncodings() {
    return Scripts.encoding
  }

  getValue({ field }) {
    return this.customConfig[field] || this.defaultConfig[field]
  }

  __get__(type) {
    let keys = {
      "hash-algorithm": 'hash',
      "symmetric-algorithm": 'symmetric',
      "asymmetric-algorithm": 'asymmetric',
      "asymmetric-padding": 'padding',
      "save-encoding": 'encoding'
    }
    let key = null, value = null
    try {
      value = this.getValue({ field: type })
      key = keys[type]
    } catch (error) { throw { status: 'error', message: 'Internal error' } }

    switch (key) {
      case 'hash':
        return this.hashAlg()[value]
      case 'encoding':
        return this.getEncodings()[value]
      case 'symmetric':
        return this.symmetricAlg()[value]
      case 'asymmetric':
        return this.asymmetricAlg()[value]
      case 'padding':
        return this.asymmetricPadding()[value]
      default:
        throw { status: 'error', message: 'Internal error' }
    }
  }

}

class Config extends ConfigProperties {
  constructor(arg) {
    super(arg)
  }

  async get() {
    let fields = [
      { name: 'select-field', field: 'hash-algorithm', label: 'Algoritmo Hash', value: null, shared: { options: this.hashAlg() } },
      { name: 'select-field', field: 'symmetric-algorithm', label: 'Algoritmo Cryptografia Simetrica', value: null, shared: { options: this.symmetricAlg() } },
      { name: 'select-field', field: 'asymmetric-algorithm', label: 'Algoritmo Cryptografia Asimetrica', value: null, shared: { options: this.asymmetricAlg() } },
      { name: 'select-field', field: 'asymmetric-padding', label: 'Padding Cryptografia Asimetrica', value: null, shared: { options: this.asymmetricPadding() } },
      { name: 'select-field', field: 'save-encoding', label: 'Encoding value save', value: null, shared: { options: this.getEncodings() } }
    ]

    for (let field of fields) {
      field.value = this.getValue(field)
    }
    
    return  this.defaultResponse({
      message: 'success',
      status: 'success',
      data: { fields }
    })
  }

  async post() {
    let bool = true
    let config = {}

    for(let key in this.defaultConfig) {
      if (!this.data[key]) {
        bool = false
        break
      }

      config[key] = this.data[key]
    }

    if (!bool) return this.defaultConfig({
      message: 'Field is missing',
      status: 'error'
    })

    this.storage.write(this.storage.__paths__('app', this.configFile), config, 'json')
    this.setCustomConfig()

    return this.defaultResponse({
      message: 'Changed configurations',
      status: 'success'
    })
  }

  async put() { }

  async delete() { }
}

const handler = (method) => (args) => Config.instance(args)[method]()

export default {
  '/config:[GET]':    handler('get'),
  '/config:[POST]':   handler('post'),
  '/config:[PUT]':    handler('put'),
  '/config:[DELETE]': handler('delete')
}