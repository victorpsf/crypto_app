import Base from './base'
import Scripts from '../lib/scripts/data.json'

export default class ConfigProperties extends Base {
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

      if (this.customConfig) return
    } catch (error) { }
    this.customConfig = this.defaultConfig
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
    return this.customConfig[field]
  }

  getConfig() {
    return this.customConfig
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