export default {
  created() {
    let rules = [{ func: 'load', call: 'load' }]

    this.__init__(rules)
  },

  mounted() {
    let rules = [{ func: 'build', call: 'build' }]

    this.__init__(rules)
  },

  methods: {
    __init__(rules) {
      for(let rule of rules) {
        if (typeof this[rule.func] !== 'function') continue
        if (typeof this[rule.call] !== 'function') continue

        this[rule.call]()
      }
    }
  }
}