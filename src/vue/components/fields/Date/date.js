import FieldMixin from '../../mixins/js/field_mixin'
import CalendarMixin from '../../mixins/js/calendar_mixin'

export default {
  name: 'text-field',
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
  data() {
    return {
      // default labels footer 
      __labels__: {
        button: {
          cancel: 'Cancel',
          confirm: 'Ok'
        }
      },
      __protected__: {
        value: {
          day: 0,
          month: 0,
          year: 0
        },
        input: {
          day: 0,
          month: 0,
          year: 0
        }
      },
      __controller__: {
        picker: false,
        type: 'day',
        year: {
          range: 24,
          multiple: 20,
          index: -1,
          viewIndex: -1,
          value: []
        }
      }
    }
  },

  /**
   * first  => @created
   * second => @mounted
   */
  methods: {
    calendarClick(event, bool) {
      this.__setter__('controller:picker', typeof bool === 'boolean' ? bool : !this.__getter__('controller:picker'))

      if (this.__getter__('controller:picker'))
        this.calendarLoad(
          ['input:new'], 
          this.dateStringToDate(this.modelValue)
        )
    },

    /**
     * call in @created
     * 
     * order ['load']
     * 
     * load => load component
     */
    load() {
      this.calendarLoad(
        ['input:value'], 
        this.dateStringToDate(this.modelValue), 
        true
      )
    },

    calendarLoad(fields = [], date, dontContinue) {
      let controller = {
        date: date,
        dateJSON: null
      }

      if (typeof controller.date !== 'object') {
        if (!(controller.date instanceof Date))
          controller.date = new Date()
        if (dontContinue) return
      }
      controller.dateJSON = (this.dateToJSON(controller.date)).date

      for(let field of fields)
        this.__setter__(field, controller.dateJSON)
      let { initial, final } = this.getDifference(
        this.__getter__('controller:year:range'),
        this.__getter__('controller:year:multiple'),
        controller.dateJSON.year
      )

      let { arrays, index } = this.splitArrayValues(
        this.generateYearsArray(
          initial,
          final
        ),
        controller.dateJSON.year,
        this.__getter__('controller:year:range')
      )

      this.__setter__('controller:year:value', arrays.filter((...args) => this.filterArrayValues.apply(null, [this.__getter__('controller:year:range')].concat(args))))
      this.__setter__('controller:year:index', index)
    },

    getDifference(range, multiple, value) {
      let initial = (value - (range * multiple)),
          final = (value + (range * multiple))

      return { initial, final }
    },

    __setter__(type, value) {
      switch (type) {
        case 'input:value':                this.__protected_value__             = value; break;
        case 'input:new':                  this.__protected_input_value__       = value; break;
        case 'input:new:year':             this.__protected_input_value_year__  = value; break;
        case 'input:new:month':            this.__protected_input_value_month__ = value; break;
        case 'input:new:day':              this.__protected_input_value_day__   = value; break;
        case 'controller:type':            this.__controller_type__             = value; break;
        case 'controller:picker':          this.__controller_picker__           = value; break;
        case 'controller:year:value':      this.__generate_year_value__         = value; break;
        case 'controller:year:index':      this.__generate_year_index__         = value; break;
        case 'controller:year:view_index': this.__generate_year_viewIndex__     = value; break;
      }
    },

    __getter__(type) {
      switch (type) {
        case 'label:confirm':                  return this.__label_button_confirm__
        case 'label:cancel':                   return this.__label_button_cancel__
        case 'input:value':                    return this.__protected_value__
        case 'input:value:year':               return this.__protected_value_year__
        case 'input:new':                      return this.__protected_input_value__
        case 'input:new:year':                 return this.__protected_input_value_year__
        case 'input:new:month':                return this.__protected_input_value_month__
        case 'input:new:day':                  return this.__protected_input_value_day__
        case 'controller:type':                return this.__controller_type__
        case 'controller:picker':              return this.__controller_picker__
        case 'controller:year:value':          return this.__generate_year_value__
        case 'controller:year:range':          return this.__generate_year_range__
        case 'controller:year:multiple':       return this.__generate_year_multiple__
        case 'controller:year:index':          return this.__generate_year_index__
        case 'controller:year:view_index':     return this.__generate_year_viewIndex__
        case 'controller:year:current:value':  return this.__generate_year_current__
        case 'controller:month:current:value': return this.__generate_month_current__
      }
    },

    changeIndex(event, mode, replaceType) {
      if (replaceType == 'year') {
        let year_length = this.__getter__('controller:year:value').length
        let year_index  = this.__getter__('controller:year:index');

        switch (mode) {
          case 'next':
            if (year_index + 1 == year_length) return
            this.__setter__('controller:year:view_index', year_index + 1); break;
          case 'previous': 
            if (year_index - 1 < 0) return
            this.__setter__('controller:year:view_index', year_index - 1); break;
          default:         return;
        }
        return
      } else if (replaceType == 'month') {
        let index = -1;
        let years = this.__getter__('controller:year:value')
        let year  = this.__getter__('input:new:year')

        switch (mode) {
          case 'next':
            year = year + 1; break;
          case 'previous': 
            year = year - 1; break;
          default:         return;
        }

        for(let _index_ in years) {
          let _years_ = years[_index_]

          if (this.$$.util.in_array(_years_, year)) {
            index = _index_
          } else {
            continue
          }
        }

        if (index < 0) return

        this.__setter__('input:new:year', year)
        this.__setter__('controller:year:index', parseInt(index))
      } else if (replaceType == 'day') {
        let month = this.__getter__('input:new:month')

        switch (mode) {
          case 'next':     month = month + 1; break;
          case 'previous': month = month - 1; break;
          default:         return;
        }
        
        if (month < 1 || month > 12) return

        this.__setter__('input:new:month', month)
      }
    },

    yearClass(value) {
      let _class = ['noselect']
      if (value == this.__getter__('input:new:year')) _class.push('current')
      return _class
    },

    monthClass(value) {
      let _class = ['noselect']
      let current = this.__getter__('input:new:month')
      if (value == current) _class.push('current')
      return _class
    },

    dayClass(day) {
      let _class = ['value', 'noselect']

      if (day) {
        _class.push('exists')
      } else {
        return _class
      }

      if (day == this.__getter__('input:new:day')) {
        _class.push('current')
      } 

      return _class
    },

    change(event, prop, value) {
      switch (prop) {
        case 'year':
          this.__setter__('input:new:year', value)
          this.__setter__('controller:type', 'month')
          break;
        case 'month':
          this.__setter__('input:new:month', value.value)
          this.__setter__('controller:type', 'day')
          break;
        case 'day':
          this.__setter__('input:new:day', value)
          this.__setter__('controller:type', 'day')
          break;
      }
    },

    unchange(event) {
      switch (this.__getter__('controller:type')) {
        case 'day':
          this.__setter__('controller:type', 'month')
          break;
        case 'month':
          this.__setter__('controller:type', 'year')
          break;
        case 'year':
          break;
      }
    },

    monthObjectReturnGmt() {
      let arrayMonths = this.monthArrayObject()
      let month       = this.__protected_input_value_month__;

      for(let data of arrayMonths) {
        if (data.value == month) return data.view
      }

      return ''
    },

    dayObjectReturnDayGmt() {
      let current = this.currentDayArray;
      let day     = this.__protected_input_value_day__;
      let gmt     = '';

      for(let GMT in current) {
        let data = current[GMT]

        if (this.$$.util.in_array(data.values, day)) {
          gmt = GMT;
          break;
        }
      }

      return gmt
    },

    cancel(event) {
      if (this.$$.util.in_array(['date-picker-cancel', 'body-modal-picker-date'], event.target.id)) {
        this.calendarClick(event, false)
      }
      return
    },

    submit(event) {
      let data = this.__getter__('input:new')
      this.__setter__('input:value', this.__getter__('input:new'))

      this.$emit('update:modelValue', `${data.year}-${('000' + data.month).slice(-2)}-${('000' + data.day).slice(-2)}`)
      this.calendarClick(event, false)
    }
  },
  computed: {
    __protected_value__: {
      get()  { return this.__protected__.value },
      set(v) { this.__protected__.value = v }
    },

    __protected_input_value__: {
      get()  { return this.__protected__.input },
      set(v) { this.__protected__.input = v }
    },

    __protected_input_value_year__: {
      get()  { return this.__protected_input_value__.year },
      set(v) { this.__protected_input_value__.year = v }
    },

    __protected_input_value_month__: {
      get()  { return this.__protected_input_value__.month },
      set(v) { this.__protected_input_value__.month = v }
    },

    __protected_input_value_day__: {
      get()  { return this.__protected_input_value__.day },
      set(v) { this.__protected_input_value__.day = v }
    },

    __label_button__() {
      return this.__labels__.button
    },

    __label_button_cancel__() {
      return this.__label_button__.cancel
    },

    __label_button_confirm__() {
      return this.__label_button__.confirm
    },

    __controller_year__() {
      return this.__controller__.year
    },

    __generate_year_range__() {
      return this.__controller_year__.range
    },

    __generate_year_multiple__() {
      return this.__controller_year__.multiple
    },

    __controller_type__: {
      get()  { return this.__controller__.type },
      set(v) { this.__controller__.type = v }
    },

    __controller_picker__: {
      get()  { return this.__controller__.picker },
      set(v) { this.__controller__.picker = v }
    },

    __generate_year_value__: {
      get()  { return this.__controller_year__.value },
      set(v) { this.__controller_year__.value = v }
    },

    __generate_year_index__: {
      get()  { 
        let { index, viewIndex } = this.__controller_year__
        return (index == viewIndex) ? index: viewIndex
      },
      set(v) {
        this.__generate_year_viewIndex__ = v
        this.__controller_year__.index = v
      }
    },

    __generate_year_viewIndex__: {
      get()  { return this.__controller_year__.viewIndex },
      set(v) { this.__controller_year__.viewIndex = v }
    },

    __generate_year_current__() {
      if (this.__generate_year_index__ < 0) return []
      return this.__generate_year_value__[this.__generate_year_index__]
    },

    __generate_month_current__() {
      return this.generateMonthArray(this.$$.util.$lang())
    },

    __protected_value_year__() {
      return this.__protected_value__.year
    },

    dateString() {
      return (Object.values(this.__protected_value__).filter(a => a > 0).map(function (value, index) {
        if (value.toString().length == 4) return value
        return `000${value}`.slice(-2)
      }).reverse().join('/') || '--/--/----')
    },

    dateStringInput() {
      return (Object.values(this.__protected_input_value__).filter(a => a > 0).map(function (value, index) {
        if (value.toString().length == 4) return value
        return `000${value}`.slice(-2)
      }).reverse().join('/') || '--/--/----')
    },

    getDaysGMT() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },

    controller_control() {
      switch (this.__controller_type__) {
        case 'year':
          return this.getStartAndFinal(this.__generate_year_current__).join(' - ')
        case 'month':
          return this.__protected_input_value_year__
        case 'day':
          return this.monthObjectReturnGmt()
      }
    },

    currentDayArray() {
      let input = this.__getter__('input:new')
      const days = this.generateDaysArray(input)
      const calendar = this.getCalendar(days)

      return calendar || { values: [] }
    }
  }
}