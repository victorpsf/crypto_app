export default {
  name: 'configuration-page',
  async mounted() {
    this.$$.request({ url: '/config', method: 'get' }).then(console.log).catch(console.error)
    this.$$.request({ url: '/config', method: 'get' }).then(console.log).catch(console.error)
    this.$$.request({ url: '/config', method: 'get' }).then(console.log).catch(console.error)
    this.$$.request({ url: '/config', method: 'get' }).then(console.log).catch(console.error)
  },
}