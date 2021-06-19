import TextField         from './Text/text.vue'
import NumericField      from './Numeric/numeric.vue'
import DateField         from './Date/date.vue'
import FileField         from './File/file.vue'
import TimeField         from './Time/time.vue'
import SelectField       from './select/select.vue'

export default [
  { name: 'text-field',          el: TextField },
  { name: 'numeric-field',       el: NumericField },
  { name: 'file-field',          el: FileField },
  { name: 'date-field',          el: DateField },
  { name: 'time-field',          el: TimeField },
  { name: 'select-field',        el: SelectField }
]