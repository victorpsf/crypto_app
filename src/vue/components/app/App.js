export default {
  name: 'App',
  data() {
    return {
      components: {
        menu: {
          name: 'menu-page',
          data: { 
            width: this.width,
            values: [{
              label: 'configuração',
              name: 'configuration-page'
            }, {
              label: 'encrypt',
              name: 'encrypt-page'
            }, {
              label: 'decrypt',
              name: 'decrypt-page'
            }, {
              label: 'hash',
              name: 'hash-page'
            }]
          }
        },
        main: {
          name: 'main-page',
          data: { 
            width: this.width,
            values: []
          }
        }
      },
      controller: {
        menu: { width: 180 },
      },
      view: {
        value: null,
        index: -1
      }
    }
  },
  methods: {
    width(arg) {
      if (arg === undefined) return this.controller.menu.width
      this.controller.menu.width = arg
    },

    menuSelected({ event, value }) {
      let { data } = value
      let index = this.components.main.data.values.push(data)

      this.showFocus({
        event: null,
        value: { data: data, index: index - 1 }
      })
    },

    menuUnselected({ event, value }) {
      let { index } = value
      let args = { event: event, value: { data: null, index: - 1 } }
      this.components.main.data.values.splice(index, 1)

      if (this.view.index - 1 >= 0) {
        args.value.data  = this.components.main.data.values[this.view.index - 1]
        args.value.index = this.view.index - 1
      }

      else if (this.components.main.data.values.length > 0) {
        args.value.index = this.view.index
        args.value.data  = this.components.main.data.values[args.value.index]
      }
      
      this.showFocus(args)
    },

    showFocus({ event, value }) {
      let { data, index } = value

      this.view = {
        value: data,
        index
      }
    }
  },
  computed: {
    menuWidth: {
      get() {
        return this.controller.menu
      },
      set(value) {
        this.controller.menu.value = value
        return this.controller.menu
      }
    },
    propsMenu() {
      return Object.assign(this.components.menu.data, { selected: this.view })
    },
    propsMain() {
      return Object.assign(this.components.main.data, { selected: this.view })
    }
  }
}