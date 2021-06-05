import { createApp } from 'vue'

import VThisDirective from './v_this_directive'

export default function (app = createApp()) {
  VThisDirective(app)
}