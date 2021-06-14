import FieldMixin from '../../mixins/js/field_mixin'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  name: 'time-field',
  mixins: [FieldMixin, CalendarMixin],
  props: {
    modelValue: {
      type: [String, null],
      default: null
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      // time controller
      __controller__: { picker: false },

      // value
      __protected__: {
        value: null
      },

      __labels__: {
        buttons: ['Cancel', 'Ok']
      },

      // picker value
      __input__: {
        hour: {
          label: 'Hour',
          value: 0,
          el: null,
          options: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, '']
        },
        minute: {
          label: 'Minute',
          value: 0,
          el: null,
          options: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, '']
        },
        second: {
          label: 'Second',
          value: 0,
          el: null,
          options: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, '']
        }
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
     * load        => load component
     */
    load() {
      if (this.modelValue === null) return;
      if (!/^(\d{2}:\d{2}:\d{2})$/g.test(this.modelValue)) return;


      let [hh, mm, ss] = this.modelValue.split(':').map(a => parseInt(a)),
          inputs = [
            { key: 'input:hour:value',   value: hh }, 
            { key: 'input:minute:value', value: mm },
            { key: 'input:second:value', value: ss },
            { key: 'value'             , value: this.modelValue }
          ]

      for(let input of inputs)
        this.__setter__(input.key, input.value)
    },

    __setter__(type, value) {
      switch (type) {
        case 'value':
          this.$emit('update:modelValue', value)
          this.__protected_value__ = value; break;
        case 'input:hour':         this.__input_hour__ = value; break;
        case 'input:minute':       this.__input_minute__ = value; break;
        case 'input:second':       this.__input_second__ = value; break;
        case 'input:hour:value':   this.__input_hour_value__ = value; break;
        case 'input:minute:value': this.__input_minute_value__ = value; break;
        case 'input:second:value': this.__input_second_value__ = value; break;
        case 'input:hour:el':      this.__input_hour_el__ = value; break;
        case 'input:minute:el':    this.__input_minute_el__ = value; break;
        case 'input:second:el':    this.__input_second_el__ = value; break;
        case 'controller:picker':  this.__controller_picker__ = value; break;
      }
    },

    __getter__(type) {
      switch (type) {
        case 'value':               return this.__protected_value__
        case 'input:hour':          return this.__input_hour__
        case 'input:minute':        return this.__input_minute__
        case 'input:second':        return this.__input_second__
        case 'input:hour:value':    return this.__input_hour_value__
        case 'input:minute:value':  return this.__input_minute_value__
        case 'input:second:value':  return this.__input_second_value__
        case 'input:hour:el':       return this.__input_hour_el__
        case 'input:minute:el':     return this.__input_minute_el__
        case 'input:second:el':     return this.__input_second_el__
        case 'input:hour:option':   return this.__input_hour_options__
        case 'input:minute:option': return this.__input_minute_options__
        case 'input:second:option': return this.__input_second_options__
        case 'controller:picker' :  return this.__controller_picker__
      }
    },

    /**
     * call in @mounted
     * 
     * build => set if your use
     */
    build() { },

    /**
     * 
     * @param {*} event 
     */
    picker(event) {
      this.__setter__('controller:picker', !this.__getter__('controller:picker'))
    },

    pickerTimeController(event, picker) {
      switch (picker.toLowerCase()) {
        case 'cancel': break;
        case 'ok':
          let values = ['input:hour:value', 'input:minute:value', 'input:second:value']

          for(let index in values) {
            let value = values[index]

            values[index] = this.__getter__(value)
          }

          this.__setter__('value', values.map(a => `000${a}`.slice(-2)).join(':'))
          break;
        default:
          return;
      }
      this.picker(event)
    },

    /**
     * @param {el, name} param1
     */
    setElement({ cicle, el, name }) {
      if (cicle !== 'mounted') return

      this.__setter__(`input:${name}:el`, el)
      this.centerValues(name, { flag: 'initial' })
    },

    /**
     * @param {*} inputType 
     * @param {*} value 
     * 
     * @returns String[]
     */
    getClass(inputType, value) {
      let classNames = ['value']
      let __value__  = this.__getter__(`input:${inputType}:value`)

      if ("number" !== typeof value) return classNames
      else classNames.push('number')
      if (value === __value__) 
        classNames.push('selected')
      return classNames
    },

    getElement(name) {
      let element = document.createElement('div')
      element = this.__getter__(`input:${name}:el`)
      return element;
    },

    getChildren(name) {
      let element   = this.getElement(name)
      let childrens = element.children
      let index     = -1

      for(let x in childrens) {
        let children           = childrens[x]

        if ("function" === typeof children) continue
        if ("number"   === typeof children) continue
        let [arg1, arg2, arg3] = children.className.split(' ')

        if ("selected" !== arg3)            continue
        index = parseInt(x)
      }

      return { el: element, index, count: childrens.length }
    },

    centerValues(name, { direction = 'center', flag = 'changed' }) {
      const { el, index, count } = this.getChildren(name) 
      let scrollHeight           = 30,
          scrollPosition         = el.scrollTop,
          scrollTo               = ("initial" === flag) ? 15: 0,
          changedIndex           = 0;

      if (index < 0) return

      switch (direction) {
        case 'center':
          scrollTo     += scrollHeight * (index - 1)
          changedIndex  = index
          break
        case 'down':
          if (scrollPosition + scrollHeight > scrollHeight * (count - 2)) return
          changedIndex = index + 1
          scrollTo = scrollPosition + scrollHeight
          break
        case 'up':
          if (scrollPosition - scrollHeight < 15) return
          changedIndex = index - 1
          scrollTo = scrollPosition - scrollHeight
          break
        default:
          break;
      }

      el.scrollTo(scrollPosition, scrollTo)
      if (['up', 'down'].indexOf(direction) >= 0)
        this.__setter__(`input:${name}:value`, (this.__getter__(`input:${name}:option`)[changedIndex]))
    },

    scrollTo(event, direction, field) {
      this.centerValues(field, { direction, flag: 'changed' })
    }
  },
  computed: {
    // set time value
    __protected_value__: {
      get()      { return (this.__protected__.value)? this.__protected__.value: null },
      set(value) { this.__protected__.value = value }
    },

    __input_hour__()   { return this.__input__.hour },
    __input_minute__() { return this.__input__.minute },
    __input_second__() { return this.__input__.second },

    __input_hour_value__: {
      get()      { return this.__input_hour__.value },
      set(value) { this.__input_hour__.value = value }
    },

    __input_minute_value__: {
      get()      { return this.__input_minute__.value },
      set(value) { this.__input_minute__.value = value }
    },

    __input_second_value__: {
      get()      { return this.__input_second__.value },
      set(value) { this.__input_second__.value = value }
    },

    __input_hour_el__: {
      get()      { return this.__input_hour__.el },
      set(value) { this.__input_hour__.el = value }
    },

    __input_minute_el__: {
      get()      { return this.__input_minute__.el },
      set(value) { this.__input_minute__.el = value }
    },

    __input_second_el__: {
      get()      { return this.__input_second__.el },
      set(value) { this.__input_second__.el = value }
    },

    __input_hour_options__()   { return this.__input_hour__.options },
    __input_minute_options__() { return this.__input_minute__.options },
    __input_second_options__() { return this.__input_second__.options },

    __controller_picker__: {
      // mailto:
      // tel:
      get()      { return this.__controller__.picker },
      set(value) { this.__controller__.picker = value }
    },

    // get time string
    __time__() {
      if (!this.__protected_value__) {
        return '--:--:--'
      }

      return this.__protected_value__
    },

    __time_picker__() {
      let attrs = ['input:hour:value', 'input:minute:value', 'input:second:value']
      
      for(let index in attrs) {
        let attr = attrs[index]
        attr = this.__getter__(attr)
        attrs[index] = `000${attr}`.slice(-2)
      }

      return attrs.join(':') + ' ' + ((parseInt(attrs[0]) > 0 && parseInt(attrs[0]) < 13) ? "AM": "PM")
    }
  }
}