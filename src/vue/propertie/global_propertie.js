import { createApp } from 'vue'

import App from './src/app'

export default function (app = createApp()) {
  app.config.globalProperties.$$ = new App()
}