import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'text-field',
  mixins: [FieldMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  data() {
    return {
      controller: {
        picker: false
      },
      protected: {
        data: {
          value: 'click to choose',
          key: null
        },
        options: []
      }
    }
  },
  methods: {
    selectLeaveMouse() {
      if (this.controller.picker)
        this.controller.picker = !this.controller.picker
    },

    selectMouse() {
      this.controller.picker = !this.controller.picker
    },

    // 
    load() {
      this.getter(this.get)
    },

    set() {
      let { options } = this.shared

      this.protected.options = options || {}
      this.setValue()
    },

    get() {
      return (internalData.key !== null) ? internalData.key: null
    },

    setOption(key, value) {
      this.internalData = {
        key, value
      }
    },

    getValue(value, none) {
      for(let key in this.internalOptions) {
        if (key == value) return {
          key,
          value: this.internalOptions[key]
        }
      }

      return none
    },

    setValue() {
      let none = {
        value: 'click to choose',
        key: null 
      }

      if (this.value) {
        none = this.getValue(this.value, none)
      }

      this.internalData = none
    }
  },
  computed: {

    internalData: {
      get()     { return this.internal.data },
      set(data) { this.internal.data = data }
    },

    internalOptions: {
      get()     { return this.internal.options },
      set(data) { this.internal.options = data }
    },

    internal: {
      get()     { return this.protected },
      set(data) { return this.protected = data }
    }
  }
}