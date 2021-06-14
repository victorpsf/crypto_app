import FieldMixin from '../../mixins/js/field_mixin'

export default {
  name: 'numeric-field',
  mixins: [FieldMixin],
  props: {
    modelValue: {
      type: [String, Number, null],
      default: 0
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  data() {
    return {
      __protected__: {
        el: null,
        value: 0,
        rule: { 
          original: 'number',
          type: 'number'
        },
        shared: {}
      },
      __props__: {
        configuration: {
          shared: [
            { attr: 'min', init: -250, type: 'number', required: true, rule: 'all' },
            { attr: 'max', init:  250, type: 'number', required: true, rule: 'all' },
            { attr: 'step', init: 0.01, type: 'number', required: true, rule: 'float' }
          ],
          types: {
            init: 'number',
            value: ['number', 'float']
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

    convertNumber() {
      let type          = this.__getter__('input:rule'),
          convert       = this.modelValue,
          default_value = 0 ;


      const _convert_to_ = function (_t_, _v_) {
        if (_t_ == 'number') {
          return parseInt(_v_)
        }
        else if (_t_ == 'float') {
          return parseFloat(_v_)
        } else {
          return 0
        }
      }

      if (typeof convert === 'number') return convert
      if (typeof convert !== 'string') return default_value
      
      switch (this.$$.util.number_type(convert)) {
        case 'decimal': 
          convert = convert.replace(/\,/g, '.')
        case 'int':
        case 'float':   return _convert_to_(type, convert)
        default: return default_value;
      }
    },

    /**
     * call in @created
     * 
     * order ['load']
     * 
     * load => load component
     */
    load() {
      let { type, ...args } = this.shared || {}

      if (!this.$$.util.in_array(this.__getter__('prop:type:rule'), type))
        type = this.__getter__('prop:type:init')

      this.__setter__('input:rule', type)
      this.__setter__('input:shared', args)
    },

    /**
     * call in @mounted
     * 
     * build => set if your use
     */
    build() {  },

    setElement({ cicle, el, name }) {
      if (cicle !== 'mounted') return;

      switch (name) {
        case 'input': this.__setter__('input:el', el); break;
        default:
          break;
      }
    },

    __getter__(type) {
      switch (type) {
        case 'input:el':       return this.__protected_el__;
        case 'input:shared':   return this.__protected_shared__;
        case 'input:type':     return this.__protected_rule_original__;      
        case 'input:rule':     return this.__protected_rule_type__;
        case 'prop:type':      return this.__configuration_types__;
        case 'prop:type:rule': return this.__configuration_types_rule__;
        case 'prop:type:init': return this.__configuration_types_init__;
        case 'prop:shared':    return this.__configuration_shared__;
      }
    },

    __setter__(type, value) { 
      switch (type) {
        case 'input:el':    
          this.__protected_el__ = value;
          this.__set_attr__()
          break;
        case 'input:shared': this.__protected_shared__ = value;    break;
        case 'input:rule':   this.__protected_rule_type__ = value; break;
      }
    },

    __set_attr__() {
      let attributes = this.__getter__('prop:shared')
      let shared     = this.__getter__('input:shared')

      for (let attribute of attributes) {
        let value = null,
            type  = this.__getter__('input:rule'),
            el    = this.__getter__('input:el');

        if (this.$$.util.value_is(shared[attribute.attr], { types: ['number'] })) {
          value = shared[attribute.attr]
        } else {
          if (this.$$.util.value_is(attribute.required, { data: [false, undefined, null] })) 
            continue;

          if (attribute.rule === "all") {
            value = attribute.init
          } 
          else if (attribute.rule === type) {
            value = attribute.init
          } else {
            continue
          }
        }

        el[attribute.attr] = value
      }
    }
  },
  computed: {
    __protected_el__: {
      get()  { return this.__protected__.el },
      set(v) { this.__protected__.el = v }
    },

    __protected_shared__: {
      get()  { return this.__protected__.shared },
      set(v) { this.__protected__.shared = v }
    },

    __protected_rule__() {
      return this.__protected__.rule
    },

    __protected_rule_original__() {
      return this.__protected__.rule.original
    },

    __protected_rule_type__: {
      get()  { return this.__protected__.rule.type },
      set(v) { this.__protected__.rule.type = v }
    },

    __configuration__() {
      return this.__props__.configuration
    },

    __configuration_types__() {
      return this.__configuration__.types
    },

    __configuration_shared__() {
      return this.__configuration__.shared
    },

    __configuration_types_rule__() {
      return this.__configuration_types__.value
    },

    __configuration_types_init__() {
      return this.__configuration_types__.init
    }
  }
}