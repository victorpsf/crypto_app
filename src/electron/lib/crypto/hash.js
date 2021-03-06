import Crypto from 'crypto'

export default class Hash {
  constructor(args) {
    let { algorithm = 'sha512', encoding = 'hex' } = args || {}
    
    this.crypto    = Crypto
    this.algorithm = algorithm
    this.encoding  = encoding
  }

  _createHash() {
    return this.crypto.createHash(this.algorithm)
  }

  update(value) {
    return this._createHash().update(value).digest(this.encoding).toUpperCase()
  }

  static update(value) {
    let hash = new this()
    return hash.update(value)
  }
}