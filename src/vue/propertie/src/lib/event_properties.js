export default class ListenProps {
  constructor() {
    this.listen = {}
  }

  verify(listen) {
    if (typeof this.listen[listen] === 'undefined')
      this.listen[listen] = []
  }

  add(listen, callback) {
    this.verify(listen)
    this.listen[listen].push(callback)
  }

  remove(listen) {
    this.verify(listen)
    delete this.listen[listen]
  }

  get(listen) {
    if (typeof listen == 'undefined')
      return Object.keys(this.listen)

    return this.listen[listen] || []
  }
}