import { createApp } from 'vue'

import Component     from './component/component'
import Page          from './page/page'
import Field         from './fields/index'

export default function (app = createApp()) {
  const components = Component.concat(Page)
                              .concat(Field)

  for(let component of components)
    app.component(component.name, component.el)
}