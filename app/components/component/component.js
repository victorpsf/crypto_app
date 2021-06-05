import { createApp } from 'vue'

import MenuPage from './menu/menu.vue'
import MainPage from './main/main.vue'

export default function (app = createApp()) {
  app.component('menu-page', MenuPage)
  app.component('main-page', MainPage)
}