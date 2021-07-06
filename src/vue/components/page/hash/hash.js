import PageMixin from '../../mixins/js/page_mixin'

export default {
  name: 'hash-page',

  mixins: [PageMixin],

  data() {
    return {
      mode: 'form',
      page: {
        name: 'hash'
      },
      buttons: [
        { label: 'Salvar', type: 'submit' }
      ]
    }
  },

  methods: {

    __setter__(field, value) {
      switch (field) {
        case 'page:fields':    this.__page_fields__  = value; break;
        case 'page:table:keys':   this.__table_keys__   = value; break;
        case 'page:table:values': this.__table_values__ = value; break;
      }
    },

    __getter__(field) {
      switch (field) {
        case 'page:fields':    return this.__page_fields__
        case 'page:table:keys':   return this.__table_keys__
        case 'page:table:values': return this.__table_values__
      }
    },

    copy(event, { value, key, target }) {
      this.$$.util.copytoClipboard(target)
    }
  },
  computed: {
    __value__() {
      let values = this.__getter__('page:table:values')

      return values.length > 0
    }
  }
}