export default {
  name: 'menu-page',
  props: {
    props: {
      type: Object,
      required: true
    }
  },
  data() {
    return { 
      style: {
        width: 0,
      },
      border: {
        cl: ['border']
      },
      controller: {
        x: {
          min: 80,
          max: 150
        },
        sub: 4
      },
    }
  },
  mounted() {
    this.setWidth(this.props.width())
  },
  methods: {

    setMenu(event, { value, index }) {
      this.$emit('selected', { event, value: { data: value } })
    },

    getClass({ value, index }) {
      if (this.props.selected.value === null) return ""

      return (this.props.selected.value.name === value.name) ? "selected": ""
    },

    getWidth(arg) {
      let sub = this.controller.sub,
          value = arg - sub 
      return value < 0 ? sub: value
    },

    setWidth(arg) {
      if (arg === undefined) return
      this.style.width = `${arg}px`

      this.props.width(this.getWidth(arg))
    },

    setHide(bool) {
      if (bool)
        this.border.cl.push('hide')
      else
        this.border.cl.pop()
    },

    offsetController(event = new DragEvent()) {
      if (event.x < this.controller.x.min) {
        this.setWidth(1 + 0)
      } 
      else if (event.x >= this.controller.x.min && this.controller.x.max > event.x) {
        this.setWidth(event.x)
      }
      else if (event.x > this.controller.x.max) {
        this.setWidth(this.controller.x.max)
      }
    },

    drag({ event, type }) {
      switch (type) {
        case 'start':
          this.setHide(true)
          break;
        case 'end':
          this.setHide(false);
          this.offsetController(event)
          break;
        case 'drag':
          this.offsetController(event)
          break;
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.props.width() > 4
      }
    },
    values: {
      get() {
        return this.props.values || []
      }
    }
  }
}
// rh@madeinweb.com.br Alberto Lourenço