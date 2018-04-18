import { icons, names, colors, palette } from './options'

/**
 * Icon class
 *
 * Encapsulate logic independently from view or store
 */
export default function Icon (data) {
  const { name, color } = data
  this.name = name
  this.color = palette[color]
  this.description = `${color} ${name}`
}

Icon.prototype = {
  render () {
    const s = 60
    return icons[this.name]
      // color
      .replace(/#000000/g, '#FFFFFF')

      // viewbox
      .replace('0 0 512 512', `-${s} -${s} ${512 + s * 2} ${512 + s * 2}`)

      // outline
      .replace(/<g>[\s\S]+<\/g>/, match => {
        const outline = match
          .replace(/<(circle|path) (.+)\/>/g, (match, a, b) => {
            return `<${a} stroke="${this.color}" stroke-width="${s * 2}" ${b} />`
          })
        return outline + match
      })
  },

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
