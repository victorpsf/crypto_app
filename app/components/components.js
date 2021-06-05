import { createApp } from 'vue'

import Component from './component/component'
import Page from './page/page'

export default function (app = createApp()) {
  Component(app)
  Page(app)
}