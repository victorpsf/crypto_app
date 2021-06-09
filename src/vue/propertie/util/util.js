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
}