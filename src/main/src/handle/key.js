import Storage from '../lib/storage'
import Base from './base'

const getKey = function ({ storage = new Storage(), call, pid, data }) {
  
}

const postKey = function ({ storage = new Storage(), call, pid, data }) {

}

const putKey = function ({ storage = new Storage(), call, pid, data }) {

}

const deleteKey = function ({ storage = new Storage(), call, pid, data }) {

}


export default {
  'key:[GET]': getKey,
  'key:[POST]': postKey,
  'key:[PUT]': putKey,
  'key:[DELETE]': deleteKey
}