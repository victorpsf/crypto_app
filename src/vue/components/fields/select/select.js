import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'text-field',
  mixins: [FieldMixin],
  props: {
    modelValue: {
      type: [String, Number, null],
      default: ''
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  data() {
    return {
      __controller__: {
        picker: false
      },
      __protected__: {
        data: {
          value: 'click to choose',
          key: null
        },
        options: []
      }
    }
  },

  /**
   * first  => @created
   * second => @mounted
   */
  methods: {
    /**
     * call in @created
     * 
     * load       => load component
     */
    load() {
      let { options = {} } = this.shared

      for(let key in options) {
        if (key == this.modelValue) {
          this.__setter__('input:value', options[key])
          this.__setter__('input:key', key)
        }
      }

      this.__setter__('input:options', options)
    },

    changedValue(data) {
      this.$emit('update:modelValue', data.key)
    },

    __setter__(type, value) {
      switch (type) {
        case 'input:value':       this.__value__   = value; break;
        case 'input:key':         this.__key__     = value; break;
        case 'input:data':
          this.changedValue(value)
          this.__data__    = value; break;
        case 'input:options':     this.__options__ = value; break;
        case 'controller:picker': this.__picker__  = value; break;
      }
    },

    __getter__(type) {
      switch (type) {
        case 'input:value':       return this.__value__;
        case 'input:key':         return this.__key__;
        case 'input:data':        return this.__data__;
        case 'input:options':     return this.__options__;
        case 'controller:picker': return this.__picker__;
      }
    },

    selectMouse(event) {
      this.__picker__ = !this.__picker__
    },

    selectLeaveMouse(event) {
      if (this.__picker__)
      this.__picker__ = !this.__picker__
    },

    setOption(key, value) {
      this.__setter__('input:data', { key, value })
    }
  },
  computed: {

    __data__: {
      get()      { return this.__protected__.data },
      set(value) { this.__protected__.data = value }      
    },

    __value__: {
      get()      { return this.__data__.value },
      set(value) { this.__data__.value = value }
    },

    __key__: {
      get()      { return this.__data__.key },
      set(value) { this.__data__.key = value }
    },

    __options__: {
      get()      { return this.__protected__.options },
      set(value) { this.__protected__.options = value }
    },

    __picker__: {
      get()      { return this.__controller__.picker },
      set(value) { this.__controller__.picker = value }
    }
  }
}