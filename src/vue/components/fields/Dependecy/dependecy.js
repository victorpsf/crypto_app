export default {
  name: '',

  props: {
    mode: {
      type: String,
      default: 'view'
    },

    field: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    modelValue: {
      type: [Object, null]
    },

    shared: {
      type: [Object],
      required: true
    }
  },

  data() {
    return {
      // fields: []
    }
  },

  methods: {
    
  },

  computed: {

  }
}