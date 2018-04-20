import Icon from './Icon'

export default function IconFactory (icons, colors) {

  Object.assign(this, {

    styles: [
      'line',
      'pathify',
      'sticker',
      'outline',
      'neon'
    ],

    names: Object.keys(icons).sort(),

    colors: Object.keys(colors),

    palette: colors,

    icons,
  })
}

IconFactory.prototype = {

  /**
   * Get Icon data
   */
  getData (name, color) {
    const random = values => values[Math.floor(Math.random() * values.length)]
    color = color || random(this.colors)
    name = name || random(this.names)
    return {name, color}
  },

  /**
   * Get Icon instance
   */
  create (name, color) {
    const title = `${color} ${name}`
    const hex = this.palette[color]
    const svg = this.icons[name]
    return new Icon(name, hex, title, svg)
  }
}
