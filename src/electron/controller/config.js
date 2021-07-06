import Fields from './fields/index'
import ConfigProperties from './config_properties'

const { SelectField, Builder } = Fields()

class Config extends ConfigProperties {
  constructor(arg) {
    super(arg)
  }

  fields() {
    return [
      SelectField.make('Algoritmo Hash', 'hash-algorithm').options(this.hashAlg),
      SelectField.make('Algoritmo Cryptografia Simetrica', 'symmetric-algorithm').options(this.symmetricAlg),
      SelectField.make('Algoritmo Cryptografia Asimetrica', 'asymmetric-algorithm').options(this.asymmetricAlg),
      SelectField.make('Padding Cryptografia Asimetrica', 'asymmetric-padding').options(this.asymmetricPadding),
      SelectField.make('Encoding Value save', 'save-encoding').options(this.getEncodings)
    ]
  }

  async get() {
    let fields = await Builder.build(this.fields(), this.getConfig())

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