import EventProperties from './lib/event_properties'

export default class EventEmitter {
  constructor() {
    this.listeners = {
      on: new EventProperties(),
      once: new EventProperties()
    }
  }

  on(listen, callback) {
    if (typeof listen !== 'string') throw new Error();
    if (typeof callback !== 'function') throw new Error();

    this.listeners.on.add(listen, callback)
  }

  once(listen, callback) {
    if (typeof listen !== 'string') throw new Error();
    if (typeof callback !== 'function') throw new Error();

    this.listeners.once.add(listen, callback)
  }

  emit(listen, ...args) {
    let onListen = this.listeners.on.get(listen)
    let onceListen = this.listeners.once.get(listen)

    this.listeners.once.remove(listen)
    for(let listener of onceListen.concat(onListen)) try {
      listener.apply(null, args)
    } catch (error) { console.error(error) }
  }

  off(listen) {
    this.listeners.on.remove(listen)
    this.listeners.once.remove(listen)
  }
}