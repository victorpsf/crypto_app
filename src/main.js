import { createApp } from 'vue'

// import template app.vue
import App from './app/App.vue'

// import modules
import GlobalProperties from './app/propertie/global_propertie'
import CustomDirectives from './app/directive/custom_directives'
import Components from './app/components/components'

// vue instance
const main = createApp(App)

// global properties
GlobalProperties(main)
// custom directives
CustomDirectives(main)
// global components
Components(main)

// mount in id
main.mount('#app')
