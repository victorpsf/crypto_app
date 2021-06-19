import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'file-field',
  mixins: [FieldMixin],
  props: {
    modelValue: {
      type: [Object, Array, null],
      default: []
    },
    shared: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      __protected__: {
        el: null,
        values: [],
        shared: {},
        progress: false
      },
      __props__: {
        configuration: [
          { attr: 'multiple', init: false, type: 'boolean', required: true },
          { attr: 'accept', init: '*', type: 'string', required: true }
        ],

        class: { init: ['upload'], append: [] }
      }
    }
  },

  /**
   * first  => @created
   * second => @mounted
   */
  methods: {
    changedValue(files) {
      this.$emit('update:modelValue', files)
    },

    /**
     * call in @created
     * 
     * order ['load']
     * 
     * load => load component
     */
    load() {
      this.__setter__('input:shared', (this.shared || {}))

      if (
        this.$$.util.value_is(this.modelValue, { data: [null] }) ||
        !this.$$.util.value_is(this.modelValue, { types: ['object'] }) ||
        !this.$$.fileReader().validate_model(this.modelValue)
      ) return

      this.__setter__(
        'input:value', 
        (!(this.modelValue instanceof Array) && !(Array.isArray(this.modelValue))) ? 
          [this.modelValue]: 
          this.modelValue
      )
    },

    /**
     * call in @mounted
     * 
     * build => set if your use
     */
    build() {  },

    __setter__(type, value) {
      switch (type) {
        case 'prop:class:append': this.__props_class_append__ = value; break;
        case 'input:el':          this.__protected_el__       = value; break;
        case 'input:value':       this.__protected_value__    = value; break;
        case 'input:progress':    this.__protected_progress__ = value; break;
        case 'input:shared':      this.__protected_shared__   = value; break;
      }
    },

    __getter__(type) {
      switch (type) {
        case 'prop:class':         return this.__props_class__;
        case 'prop:class:init':    return this.__props_class_init__;
        case 'prop:class:append':  return this.__props_class_append__;
        case 'prop:class:union':   return this.__props_class_union__;
        case 'prop:configuration': return this.__props_configuation__;
        case 'input:el':           return this.__protected_el__;
        case 'input:value':        return this.__protected_value__;
        case 'input:progress':     return this.__protected_progress__;
        case 'input:shared':       return this.__protected_shared__;
      }
    },

    __set_attr__() {
      let attributes = this.__getter__('prop:configuration')
      let shared     = this.__getter__('input:shared')

      for (let attribute of attributes) {
        let value = null,
            el    = this.__getter__('input:el');
          
        value = shared[attribute.attr]
        if (
          !attribute.required && 
          (
            !this.$$.util.value_is(value, { types: [attribute.type]}) ||
            this.$$.util.value_is(value, { data: [undefined, null] })
          )
        ) {
          continue
        }

        if (
          (
            !this.$$.util.value_is(value, { types: [attribute.type]}) ||
            this.$$.util.value_is(value, { data: [undefined, null] })
          )
        ) {
          value = attribute.init
        }

        el[attribute.attr] = value
      }
    },

    setElement({ cicle, el, name }) {
      if (cicle !== 'mounted') return

      switch (name) {
        case 'input':
          this.__setter__('input:el', el)
          this.__set_attr__()
          break;
      }
    },

    uploadButtonClass(type, value) {
      let values = this.__getter__('prop:class:append'),
          index  = this.$$.util.index_array(values, value)

      if (type == 'set') 
        values.push(value)
      if (type == 'unset') {
        if (index < 0) return
        values.splice(index, 1)
      }

      this.__set_attr__('prop:class:append', values)
    },

    progressUpload(bool) {
      this.__setter__('input:progress', bool)
      this.uploadButtonClass(bool ? 'set': 'unset', 'disabled')
    },

    getFileIndex({ name, type, size }) {
      let files = this.__getter__('input:value')
      let file = files.map((file, index) => ({ index, file }))
                      .filter(({ index, file }) => (file.name === name && file.type === type && file.size === size))
      if (file.length === 0) return { index: -1, files }
      return { index: file[0].index, files }
    },

    getFile({ name, type, size }) {
      let { index, files } = this.getFileIndex({ name, type, size })

      if (index < 0) return null
      else           return files[index]
    },

    setFile(file) {
      let { files, index } = this.getFileIndex(file)

      if (index >= 0) {
        files.splice(index, 1, file)
      } else {
        files.push(file)
      }
      this.__setter__('input:value', files)
    },

    listenFileChange({ event, type, file, error }) {
      switch (type) {
        case 'end':
        case 'progress': this.setFile(file); break;
        default:                             break;
      }
    },

    removeFile(event, index) {
      let files = []
      this.__setter__('input:value', ((files = this.__getter__('input:value')) && (files.splice(index, 1)) && files))
    },

    async addFiles(files) {
      let __files__ = []

      for(let index in files) {
        let file = files[index]
        let fileReader = this.$$.fileReader(file)

        fileReader.listen(this.listenFileChange)
        file = await fileReader.readFile({ encoding: 'hex', src: false })

        if (file === null) continue
        __files__.push(file)
      }

      this.__setter__('input:value', __files__)
      this.changedValue(__files__)
    },

    async inputFileChange(event = new Event()) {
      this.progressUpload(true)

      try {
        let values = event.target.files,
          files = []
  
        for(let file of (values || []))
          files.push(file)

        await this.addFiles(files)
      } catch (error) { console.error(error) }

      this.progressUpload(false)
      event.target.files = undefined
    },

    inputFilesClick(event = new MouseEvent()) {
      let el = this.__getter__('input:el')
      if (el == null) return
      el.click()
    }
  },
  computed: {
    __protected_el__: {
      get()  { return this.__protected__.el },
      set(v) { this.__protected__.el = v }
    },

    __protected_value__: {
      get()  { return this.__protected__.values },
      set(v) { this.__protected__.values = v }
    },

    __protected_progress__: {
      get()  { return this.__protected__.progress },
      set(v) { this.__protected__.progress = v }
    },

    __protected_shared__: {
      get()  { return this.__protected__.shared },
      set(v) { this.__protected__.shared = v }
    },

    __props_configuation__() {
      return this.__props__.configuration
    },

    __props_class__() {
      return this.__props__.class
    },

    __props_class_init__() {
      return this.__props__.class.init
    },

    __props_class_append__: {
      get()  { return this.__props__.class.append },
      set(v) { this.__props__.class.append = v }
    },

    __props_class_union__() {
      return this.__props_class_init__.concat(this.__props_class_append__)
    },
  }
}