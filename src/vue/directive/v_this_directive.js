import { createApp } from 'vue'

export default function (app = createApp()) {
  const call = function (lifeCicle, el, binding, vnode) {
    try {
      if (typeof binding.value !== 'function') 
        throw 'v-this directive value is not a function'
      
      if (binding.arg) binding.value({ cicle: lifeCicle, el, name: binding.arg })
      else             binding.value({ cicle: lifeCicle, el, name: null })
    } catch (error) {
      console.error(error)
    }
  }

  app.directive('this', {
    created(...args) {
      call.apply(null, ['created'].concat(args))
    },
    // 
    mounted(...args) {
      call.apply(null, ['mounted'].concat(args))
    }
  })
}