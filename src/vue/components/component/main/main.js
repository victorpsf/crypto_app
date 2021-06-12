export default {
  name: '',
  props: {
    props: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: {
        close: {
          name: "cancel.svg",
          size: 1077,
          type: "image/svg+xml",
          lastModified: 1622721739081,
          src: "data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAwMSA1MTIuMDAxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAxIDUxMi4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjg0LjI4NiwyNTYuMDAyTDUwNi4xNDMsMzQuMTQ0YzcuODExLTcuODExLDcuODExLTIwLjQ3NSwwLTI4LjI4NWMtNy44MTEtNy44MS0yMC40NzUtNy44MTEtMjguMjg1LDBMMjU2LDIyNy43MTcNCgkJCUwzNC4xNDMsNS44NTljLTcuODExLTcuODExLTIwLjQ3NS03LjgxMS0yOC4yODUsMGMtNy44MSw3LjgxMS03LjgxMSwyMC40NzUsMCwyOC4yODVsMjIxLjg1NywyMjEuODU3TDUuODU4LDQ3Ny44NTkNCgkJCWMtNy44MTEsNy44MTEtNy44MTEsMjAuNDc1LDAsMjguMjg1YzMuOTA1LDMuOTA1LDkuMDI0LDUuODU3LDE0LjE0Myw1Ljg1N2M1LjExOSwwLDEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdMMjU2LDI4NC4yODcNCgkJCWwyMjEuODU3LDIyMS44NTdjMy45MDUsMy45MDUsOS4wMjQsNS44NTcsMTQuMTQzLDUuODU3czEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdjNy44MTEtNy44MTEsNy44MTEtMjAuNDc1LDAtMjguMjg1DQoJCQlMMjg0LjI4NiwyNTYuMDAyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
        }
      },
      components: [
        { name: 'text-field',    label: 'Nome', field: 'name', value: null, shared: { type: 'password' } },
        { name: 'time-field',    label: 'Hora de Nascimento', value: '04:00:00', shared: {  } },
        // { name: 'select-field',  label: 'Algoritmo', value: 1,    shared: { options: { 1: 'teste', 2: 'testando muito grande o teste'  } } },
        // { name: 'file-field',    label: 'Arquivo', value: null, shared: {  } },
        // { name: 'numeric-field', label: 'Idade', value: null, shared: {  } },
        // { name: 'date-field',    label: 'Data Nascimento', value: null, shared: {  } },
        // { name: 'input-field',   label: 'Input Field', value: '04:00:00', shared: {  } },
      ]
    }
  },

  methods: {

    click(event) {
      console.log(event, this.components)
    },

    fieldName(component) {
      return component.field
    },

    getClass({ value, index }) {
      if (this.props.selected.value === null) return ""

      return (this.props.selected.value.name === value.name) ? "selected": ""
    },

    openView({ value, index }) {
      return this.getClass({ value, index }) === 'selected' ? true: false
    },

    close(event, { index, value }) {
      this.$emit('close', { event, value: { data: value, index } })
    },

    page(event, { index, value }) {
      this.$emit('focus', { event, value: { data: value, index } })
    }
  },
  computed: {

    values() {
      return this.props.values || []
    },

    width() {
      return 'calc(100% - ' + this.props.width() + 'px)'
    },

    style() {
      return {
        width: this.width
      }
    }
  }
}