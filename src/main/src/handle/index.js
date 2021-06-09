import Storage from '../lib/storage'
import Base from './base'

import ConfigFunctions from './config'
import KeyFunctions from './key'

const storage = Storage.load();

const allFuncs = Object.assign(
  ConfigFunctions, 
  KeyFunctions
)

export default async function handler(event, args) {
  try {
    let response = await allFuncs[args.call]({ storage, ...args })
    
  } catch (error) {
    
  }
}