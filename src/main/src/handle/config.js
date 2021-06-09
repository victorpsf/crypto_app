import Storage from '../lib/storage'

const getConfig = function ({ storage = new Storage(), call, pid, data }) {
  let { type } = data

  if (type == 'fields') {
    return {
      
    }
  }
}

const postConfig = function ({ storage = new Storage(), call, pid, data }) {

}

const putConfig = function ({ storage = new Storage(), call, pid, data }) {

}

const deleteConfig = function ({ storage = new Storage(), call, pid, data }) {

}

export default {
  'config:[GET]': getConfig,
  'config:[POST]': postConfig,
  'config:[PUT]': putConfig,
  'config:[DELETE]': deleteConfig
}