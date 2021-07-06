export default {
  name: 'configuration-page',

  data() {
    return {
      mode: 'form',
      components: [ ],
      buttons: [
        // { label: 'Cancel', type: 'cancel' },
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
        let { data: { fields } } = await this.$$.ipc.request({ url: '/config', method: 'get' })

        console.log(fields)
        this.__setter__('page:component', fields)
      } catch (error) { }
    },

    __setter__(field, value) {
      switch (field) {
        case 'page:component':
          this.components = value; break;
      }
    },

    async _listen_(event) {
      let data = {}

      for (let component of this.components) {
        data[component.field] = component.value
      }

      let response = await this.$$.ipc.request({ url: '/config', method: 'post', data })
    //   {
    //     "hash-algorithm": 3,
    //     "symmetric-algorithm": 17,
    //     "asymmetric-algorithm": 6,
    //     "asymmetric-padding": 4
    // }
      console.log(data, response)
    }
  },
}