import FieldMixin from '../../mixins/js/field_mixin'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  name: 'time-field',
  mixins: [FieldMixin, CalendarMixin],
  props: {
    value: {
      type: Number,
      default: null
    },
    shared: {
      type: [Object, null],
      default: () => { return {} }
    }
  },
  data() {
    return {
      // time controller
      __controller__: {
        picker: false,
        component: 'time-picker-field'
      },

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
          options: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, '']
        },
        minute: {
          label: 'Minute',
          value: 0,
          options: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, '']
        },
        second: {
          label: 'Second',
          value: 0,
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
     * set        => set value
     * get        => get value
     * __setter__ => 
     * __getter__ => return get function
     */
    set() {
      if (this.value === null) return;
      this.__protected__.value = new Date(this.value)
      this.__setter__(this.__protected__.value)
    },

    __setter__(value = new Date()) {
      let attr = [{ 
        key: 'hour', func: 'getHours' 
      }, {
        key: 'minute', func: 'getMinutes'
      }, {
        key: 'second', func: 'getSeconds'
      }]

      for(let att of attr)
        this.__input__[att.key] = value[att.func]()
    },

    __getter__() {
      if ('function' !== typeof(this.getter)) return
      this.getter(this.get)
    },

    get() {
      return this.__value__
    },

    /**
     * call in @mounted
     */
    build() {
    },

    /**
     * 
     * @param {*} event 
     */
    picker(event) {
      this.__controller__.picker = !this.__controller__.picker
    },

    /**
     * 
     */
    getClass(inputType, value) {
      let classNames = ['value']

      if ("number" !== typeof value) return classNames
      console.log(value, this[`__input_${inputType}__`])
      if (value === this[`__input_${inputType}__`]) classNames.push('selected')
      return classNames
    },

    setAttr() {
      
    }
  },
  computed: {
    // set time value
    __value__: {
      get() { return (this.__protected__.value)? this.__protected__.value.getTime(): null },
      set(value) { this.__protected__.value = value }
    },

    // get time string
    __time__() {
      if (!this.__value__) {
        return '--:--:--'
      }

      let time = new Date(this.__value__)
      this.format(time, 'time')
    },

    __input_hour__: { 
      get()      { return this.__input__.hour.value },
      set(value) { this.__input__.hour.value = value }
    },

    __input_minute__: {
      get()      { return this.__input__.minute.value },
      set(value) { this.__input__.minute.value = value }
    },

    __input_second__: {
      get()      { return this.__input__.second.value },
      set(value) { this.__input__.second.value = value }
    },

    __time_picker__() {
      let attrs = ['__input_hour__', '__input_minute__', '__input_second__']

      for(let index in attrs) {
        let attr = attrs[index]

        attrs[index] = `000${this[attr]}`.slice(-2)
      }

      return attrs.join(':')
    }
  }
}