import { names, colors, palette } from './options'

/**
 * Icon class
 *
 * Used to encapsulate logic away from the view and store
 */
export default function Icon (data) {
  const { name, color } = data
  this.name = name
  this.color = palette[color]
  this.description = `${color} ${name}`
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
