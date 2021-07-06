import Storage from '../lib/storage'

import ConfigFunctions from '../controller/config'
import KeyFunctions from '../controller/key'
import HashFunctions from '../controller/hash'

const storage = Storage.load();

const allFuncs = Object.assign(
  ConfigFunctions, 
  KeyFunctions,
  HashFunctions
)

export default function handler(args) {
  return new Promise(async (resolve, reject) => {
    try {
      let func = allFuncs[args.call]

      if (typeof func !== 'function') throw 'method is not supported'
      let response = await func({ storage, ...args })
      
      return resolve({
        original: args,
        response
      })
    } catch (error) {
      console.log('error: ', error)
      return reject({
        original: args,
        response: { status: 'error', message: error, result: null }
      })
    }
  })
}