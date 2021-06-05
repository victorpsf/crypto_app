import Hash from './hash'
import Asymmetric from './asymmetric'
import Symmetric from './symmetric'

export default class Crypto {
  static Hash(args) {
    return new Hash(args)
  }

  static Asymmetric(args) {
    return new Asymmetric(args)
  }

  static Symmetric(args) {
    return new Symmetric(args)
  }
}