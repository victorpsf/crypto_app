import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'text-field',
  mixins: [FieldMixin],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return { 
      __protected__: {
        el: null,
        visible: false,
        rule: ['text']
      },
      __props__: {
        configuration: {
          shared: [
            { propertie: 'maxLength', init: 120, type: 'number', required: true }
          ],
          types: {
            init: 'text',
            value: ['text', 'email', 'password']
          }
        }
      }
    }
  },

  /**
   * first  => @created
   * second => @mounted
   */
  methods: {

    changedValue(event) {
      this.$emit('update:modelValue', event.target.value)
    },

    /**
     * call in @created
     * 
     * order ['load']
     * 
     * load => load component
     */
    __setter__(type, value) {
      switch (type) {
        case 'el':
          this.__protected_el__ = value; return
        case 'rule':
          this.__protected_rule__ = value; return
        case 'visible':
          this.__protected_visible__ = value; return
      }
    },

    __getter__(type) {
      switch (type) {
        case 'el':      return this.__protected_el__
        case 'rule':    return this.__protected_rule__
        case 'visible': return this.__protected_visible__
      }
    },

    /**
     * call in @mounted
     * 
     * build => set if your use
     */
    build() {
      let { type, ...args } = (this.shared || {})

      this.__load_type__({ type })
      this.__load_prop__({ ...args })
    },

    __load_type__({ type }) {
      if (!this.$$.util.in_array(this.__prop_conf_types__.value, type)) {
        this.__setter__('rule', [this.__prop_conf_types__.init])
        return
      }

      this.__setter__('rule', [type])
    },

    async __load_prop__(props = {}) {
      let trying = 200, count = 0

      /**
       * await load element in v-this mounted cicle
       */
      while(this.__protected_el__ === null) {
        if (count === trying) break
        await this.$$.util.sleep(0.1)
        count++
      }

      /**
       * if element is null don't continue
       */
      if (this.__protected_el__ === null) return

      for(let rule of this.__prop_conf_shared__) {
        let empty = (props[rule.propertie] === null || props[rule.propertie] === undefined)
        let type  = typeof props[rule.propertie] != rule.type

        if (rule.required && empty)
          props[rule.propertie] = rule.init
        if (rule.required && type)
          props[rule.propertie] = rule.init
        
        this.__protected_el__[rule.propertie] = props[rule.propertie]
      }
    },

    setElement({ cicle = 'created', el = null, name = null }) {
      if (cicle !== 'mounted') return

      switch (name) {
        case 'input':
          this.__setter__('el', el); break
      }
    },

    passwordVisibleChange(event) {
      this.__setter__('visible', !this.__getter__('visible'))
      let rule = this.__getter__('rule')

      if (this.__getter__('visible')) rule.push('text')
      else                            rule.splice(1, 1)

      this.__setter__('rule', rule)
    }
  },
  computed: {
    __protected_value__: {
      get()      { return this.__protected__.value },
      set(value) { this.__protected__.value = value }
    },
    __protected_el__: {
      get()      { return this.__protected__.el },
      set(value) { this.__protected__.el = value }
    },
    __protected_visible__: {
      get()      { return this.__protected__.visible },
      set(value) { this.__protected__.visible = value }
    },
    __protected_rule__: {
      get()      { return this.__protected__.rule },
      set(value) { this.__protected__.rule = value }
    },
    __prop_conf__()        { return this.__props__.configuration },
    __prop_conf_shared__() { return this.__props__.configuration.shared },
    __prop_conf_types__()  { return this.__props__.configuration.types },
    __password__()         { return this.__protected_rule__[0] === 'password' },
    __type__()             {
      return (this.__protected_rule__.length > 1) ? 
        this.__protected_rule__[1] : 
        this.__protected_rule__[0]
    }
  }
}