import { createApp } from 'vue'

export default function (app = createApp()) {
  app.directive('this', {
    // 
    created(el, binding, vnode) {
      try {
        if (typeof binding.value !== 'function') 
          throw 'v-this directive value is not a function'
        
        if (binding.arg) binding.value({ el, name: binding.arg })
        else             binding.value({ el, name: null })
      } catch (error) {
        console.error(error)
      }
    }
  })
}