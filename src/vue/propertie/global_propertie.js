import { createApp } from 'vue'

import App from './src/app'
// import App from './app'

export default function (app = createApp()) {
  app.config.globalProperties.$$ = new App()
}