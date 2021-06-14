export default class Util {
  constructor() { 
    this.characters = {
      latters: 'abcdefghijklmnopqrstuvxywz',
      number: '0123456789',
      super: '!@#$%&*()_-+=§{}][;:,.<>?/|'
    }
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * ((max || 20) - (min || 0) + 1) + (min || 0))
  }

  randomString(len, args) {
    let { useNumber = false, useSuper = false } = args || { useNumber: false, useSuper: false }
    let possibilities = this.characters.latters,
        count = 0,
        rand = '';

    if (useNumber) possibilities += this.characters.number;
    if (useSuper)  possibilities += this.characters.super;

    while(count < (len || 20)) {
      let index = this.randomNumber(0, possibilities.length - 1);
      rand += possibilities[index];
      count++;
    }

    return rand;
  }

  sleep(time) {
    time = parseFloat(time) || 1
    time *= 1000

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(true)
      }, time)
    })
  }

  $lang() {
    return window.navigator.browserLanguage || window.navigator.language || 'pt-BR';
  }

  object_value(object, key, orValue) {
    try {
      return object[key] || orValue
    } catch (error) {
      return orValue
    }
  }

  object_key(object, key) {
    try {
      return object[key] !== undefined
    } catch (error) {
      console.error(error)
      return false
    }
  }

  in_array(array, value) {
    try {
      return array.indexOf(value) >= 0
    } catch (error) {
      console.error(error)
      return false
    }
  }

  array_info(array) {
    let info = { start: 0, end: 0 }

    try {
      info.end = array.length
    } catch (error) {
      console.error(error)
    }

    return info
  }

  value_is(value, { data = [], types = [] }) {
    let bool = false
    try {
      for (let _data_ of data) {
        if (bool) continue
        bool = value === _data_
      }
      for (let type of types) {
        if (bool) continue
        bool = type === typeof value
      }
    } catch (error) { console.error(error) }
    return bool
  }

  number_type(value) {
    if (!this.value_is(value, { types: ['string'] })) return 'NaN'

    // int validation
    if (/^(\d+)$/g.test(value)) {
      return 'int'
    }
    // float validation
    else if (/^(\d+\.\d+)$/g.test(value)) {
      return 'float'
    }
    // decimal validation
    else if (/^(\d+\,\d+)$/g.test(value)) {
      return 'decimal'
    }
    // invalid format
    else {
      return 'NaN'
    }
  }
}