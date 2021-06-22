export default {
  name: 'hash-page',

  data() {
    return {
      mode: 'form',
      components: [],
      table: {
        keys: [],
        values: [],
        __icon__: {
          excluir: { 
            "name": "rubbishbin_102620.svg", 
            "size": 1654, 
            "type": "image/svg+xml", 
            "lastModified": 1624288167969, 
            "src": "data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9Ijc3NC4yNjZweCIgaGVpZ2h0PSI3NzQuMjY2cHgiIHZpZXdCb3g9IjAgMCA3NzQuMjY2IDc3NC4yNjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDc3NC4yNjYgNzc0LjI2NjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik02NDAuMzUsOTEuMTY5SDUzNi45NzFWMjMuOTkxQzUzNi45NzEsMTAuNDY5LDUyNi4wNjQsMCw1MTIuNTQzLDBjLTEuMzEyLDAtMi4xODcsMC40MzgtMi42MTQsMC44NzUNCgkJCUM1MDkuNDkxLDAuNDM4LDUwOC42MTYsMCw1MDguMTc5LDBIMjY1LjIxMmgtMS43NGgtMS43NWMtMTMuNTIxLDAtMjMuOTksMTAuNDY5LTIzLjk5LDIzLjk5MXY2Ny4xNzlIMTMzLjkxNg0KCQkJYy0yOS42NjcsMC01Mi43ODMsMjMuMTE2LTUyLjc4Myw1Mi43ODN2MzguMzg3djQ3Ljk4MWg0NS44MDN2NDkxLjZjMCwyOS42NjgsMjIuNjc5LDUyLjM0Niw1Mi4zNDYsNTIuMzQ2aDQxNS43MDMNCgkJCWMyOS42NjcsMCw1Mi43ODItMjIuNjc4LDUyLjc4Mi01Mi4zNDZ2LTQ5MS42aDQ1LjM2NnYtNDcuOTgxdi0zOC4zODdDNjkzLjEzMywxMTQuMjg2LDY3MC4wMDgsOTEuMTY5LDY0MC4zNSw5MS4xNjl6DQoJCQkgTTI4NS43MTMsNDcuOTgxaDIwMi44NHY0My4xODhoLTIwMi44NFY0Ny45ODF6IE01OTkuMzQ5LDcyMS45MjJjMCwzLjA2MS0xLjMxMiw0LjM2My00LjM2NCw0LjM2M0gxNzkuMjgyDQoJCQljLTMuMDUyLDAtNC4zNjQtMS4zMDMtNC4zNjQtNC4zNjNWMjMwLjMyaDQyNC40MzFWNzIxLjkyMnogTTY0NC43MTUsMTgyLjMzOUgxMjkuNTUxdi0zOC4zODdjMC0zLjA1MywxLjMxMi00LjgwMiw0LjM2NC00LjgwMg0KCQkJSDY0MC4zNWMzLjA1MywwLDQuMzY1LDEuNzQ5LDQuMzY1LDQuODAyVjE4Mi4zMzl6Ii8+DQoJCTxyZWN0IHg9IjQ3NS4wMzEiIHk9IjI4Ni41OTMiIHdpZHRoPSI0OC40MTgiIGhlaWdodD0iMzk2Ljk0MiIvPg0KCQk8cmVjdCB4PSIzNjMuMzYxIiB5PSIyODYuNTkzIiB3aWR0aD0iNDguNDE4IiBoZWlnaHQ9IjM5Ni45NDIiLz4NCgkJPHJlY3QgeD0iMjUxLjY5IiB5PSIyODYuNTkzIiB3aWR0aD0iNDguNDE4IiBoZWlnaHQ9IjM5Ni45NDIiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" 
          }
        }
      },
      buttons: [
        { label: 'Salvar', type: 'submit' }
      ]
    }
  },

  mounted() {
    this.getFields()
  },

  methods: {
    async getFields() {
      try {
        let { data: { fields, keys, values } } = await this.$$.ipc.request({ url: '/hash', method: 'get' })

        this.__setter__('page:component', fields)
        this.__setter__('page:table:keys', keys)
        this.__setter__('page:table:values', values)
      } catch (error) { console.error(error) }
    },

    __setter__(field, value) {
      switch (field) {
        case 'page:component':
          this.components = value; break;
        case 'page:table:keys':
          this.table.keys = value; break;
        case 'page:table:values':
          this.table.values = value; break;
      }
    },

    __getter__(field) {
      switch (field) {
        case 'page:component': return this.components
        case 'page:table:keys': return this.table.keys
        case 'page:table:values': return this.table.values
      }
    },

    async _listen_(event) {
      try {
        let data = {}

        for (let component of this.components) {
          data[component.field] = component.value
        }
  
        await this.$$.ipc.request({ url: '/hash', method: 'post', data })
      } catch (error) { console.error(error) }
      this.getFields()
    },

    async remove(event, { value, index }) {
      try {
        await this.$$.ipc.request({ url: '/hash', method: 'delete', data: value })
      } catch (error) { console.error(error) }
      this.getFields()
    }
  },
  computed: {
    valueLen() {
      return (this.__getter__('page:table:values')).length
    }
  }
}