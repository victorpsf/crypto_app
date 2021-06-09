// create vue app function
import { createApp } from 'vue'

// import template app.vue
import AppComponent from './components/app/App.vue'

// import modules
import GlobalProperties from './propertie/global_propertie'
import CustomDirectives from './directive/custom_directives'
import Components from './components/components'

// start vue-js
export default async function () {

  // vue instance
  const main = createApp(AppComponent)

  // global properties
  GlobalProperties(main)
  // custom directives
  CustomDirectives(main)
  // global components
  Components(main)

  // mount in id
  main.mount('#app')
}