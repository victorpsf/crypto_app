/**
  localeMatcher?: "best fit" | "lookup";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
  formatMatcher?: "best fit" | "basic";
  hour12?: boolean;
  timeZone?: string;
*/

export default {
  methods: {
    format(value = new Date(), type) {
      switch (type) {
        case 'time':
          return value.toLocaleTimeString()
        case 'date':
          return value.toLocaleDateString()
        case 'date-time':
          return value.toLocaleString()
        default:
          return value.toJSON()
      }
    },

    generateYearsArray(initial, final) {
      let years = []
      for(let x = initial; x <= final; x++) years.push(x)
      return years
    },

    splitArrayValues(array = [], value, length) {
      let arrays = [], count = 0, index = -1

      while(count < array.length) {
        let _index_;
        if ((count + length) < array.length) 
          _index_ = arrays.push(array.slice(count, count + length))
        else 
          _index_ = arrays.push(array.slice(count))

        if (this.$$.util.in_array(arrays[_index_ - 1], value))
          index = _index_ - 1

        count += length
      }

      return { arrays, index }  
    },

    filterArrayValues(range, value, index, array) {
      return range == value.length
    },

    dateToJSON(date = new Date()) {
      return {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        time: {
          hour: date.getHours(),
          minute: date.getMinutes(),
          seconds: date.getSeconds()
        }
      }
    },

    dateStringToDate(value) {
      if (typeof value !== 'string' || !/\d{4}(\-|\/)\d{2}(\-|\/)\d{2}/g.test(value))
        return new Date()

      let exec = /\d{4}[\-\/]\d{2}[\-|\/]\d{2}/g.exec(value)
      let [ year, month, day ] = exec[0].split(/[\/-]/g).map(a => parseInt(a))
      return new Date(year, month - 1, day)
    },

    createDateUsingUTC(...args) {
      let date = new Date()
      let [
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate()
      ] = args
      return new Date(`${year}-${month}-${day}`)
    },

    monthArrayObject() {
      return [
        { value: 1,  view: 'Jan' },
        { value: 2,  view: 'Feb' },
        { value: 3,  view: 'Mar' },
        { value: 4,  view: 'Apr' },
        { value: 5,  view: 'May' },
        { value: 6,  view: 'Jun' },
        { value: 7,  view: 'Jul' },
        { value: 8,  view: 'Aug' },
        { value: 9,  view: 'Sep' },
        { value: 10, view: 'Oct' },
        { value: 11, view: 'Nov' },
        { value: 12, view: 'Dec' }
      ]
    },

    generateMonthArray(lang = 'pt-br') {
      let months = this.monthArrayObject()

      for(let index in months) {
        let { value, view } = months[index]

        months[index] = {
          value, 
          view: this.getGMTLang(view, lang)
        }
      }

      return months
    },

    generateDaysArray(opt = { year: 0, month: 0, day: 0 }) {
      let count = 0
      var date = this.createDateUsingUTC(opt.year, opt.month, 1);
      var days = [];
  
      while (date.getMonth() + 1 === opt.month) {
        days.push(new Date(date.toJSON()));
        date.setDate(date.getDate() + 1);


        if (count == 120) break
        count++;
      }

      for(let index in days) {
        let day = days[index]

        if (day.getMonth() + 1 == opt.month) continue;
        else days.splice(index, 1)
      }
  
      return days;
    },

    getCalendar(days = [new Thursday()]) {
      let calendar = {
        // sunday domingo
        Sun: {
          view: 'S',
          values: []
        },
        // monday segunda
        Mon: {
          view: 'M',
          values: []
        },
        // tuesday terça
        Tue: {
          view: 'T',
          values: []
        },
        // wednesday quarta
        Wed: {
          view: 'W',
          values: []
        },
        // Thursday quinta
        Thu: {
          view: 'T',
          values: []
        },
        // Friday sexta
        Fri: {
          view: 'F',
          values: []
        },
        // Saturday domingo
        Sat: {
          view: 'S',
          values: []
        }
      }

      for(let day of days) {
        let { M } = this.getGMTObject(day)
        
        calendar[M].values.push(day.getDate())
      }
      calendar = this.getDiference(calendar, days)

      return calendar
    },

    getDiference(calendar, days) {
      let [initial, final] = this.getStartAndFinal(days),
          { M } = this.getGMTObject(initial),
          keys = []

      if (M == 'Mon') keys.push('Sun')
      if (M == 'Tue') keys.push('Mon', 'Sun')
      if (M == 'Wed') keys.push('Tue', 'Mon', 'Sun')
      if (M == 'Thu') keys.push('Wed', 'Tue', 'Mon', 'Sun')
      if (M == 'Fri') keys.push('Thu', 'Wed', 'Tue', 'Mon', 'Sun')
      if (M == 'Sat') keys.push('Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun')
      if (M == 'Sun') keys.push('Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun')

      for(let key of keys) {
        calendar[key].values.unshift('')
      }

      return calendar
    },

    getGMTLang(view, lang) {
      switch (view) {
        case 'Jan': return (lang == 'pt-br') ? 'Jan': view;
        case 'Feb': return (lang == 'pt-br') ? 'Fev': view;
        case 'Mar': return (lang == 'pt-br') ? 'Mar': view;
        case 'Apr': return (lang == 'pt-br') ? 'Abr': view;
        case 'May': return (lang == 'pt-br') ? 'Mai': view;
        case 'Jun': return (lang == 'pt-br') ? 'Jun': view;
        case 'Jul': return (lang == 'pt-br') ? 'Jul': view;
        case 'Aug': return (lang == 'pt-br') ? 'Ago': view;
        case 'Sep': return (lang == 'pt-br') ? 'Set': view;
        case 'Oct': return (lang == 'pt-br') ? 'Out': view
        case 'Nov': return (lang == 'pt-br') ? 'Nov': view;
        case 'Dec': return (lang == 'pt-br') ? 'Dez': view;
        default:    return ''
      }
    },

    getStartAndFinal(array = []) {
      let start  = array[0],
          length = array.length,
          final  = array[length - 1]
      
      return [start, final]
    },

    getGMTObject(date = new Date()) {
      let [M, D, MM, YY, H, GMT] = date.toUTCString().replace(',', '').split(' ')

      return {
        M, D, MM, YY, H
      }
    }
  }
}
