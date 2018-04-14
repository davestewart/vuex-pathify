import { names, colors } from './options'

/**
 * Icon class
 *
 * Used to encapsulate logic away from the view and store
 */
export default function Icon (data) {
  Object.assign(this, data)
  this.description = `${this.color.name} ${this.name}`
}

Icon.prototype = {
  doSomething () {
    alert(`Running function on "${this.description}" instance...`)
  },
}

Icon.create  = function () {
  const random = values => values[Math.floor(Math.random() * values.length)]
  const name = random(names)
  const color = random(colors)
  return {name, color}
}
