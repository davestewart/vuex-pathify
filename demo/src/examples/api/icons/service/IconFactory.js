import Icon from './Icon'

export default function IconFactory (icons, colors) {

  this.config = {

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
  }
}

IconFactory.prototype = {

  /**
   * Get Icon data
   */
  getData (name, color) {
    const random = values => values[Math.floor(Math.random() * values.length)]
    color = color || random(this.config.colors)
    name = name || random(this.config.names)
    return {name, color}
  },

  /**
   * Get Icon instance
   */
  create (name, color) {
    const title = `${color} ${name}`
    const hex = this.config.palette[color]
    const svg = this.config.icons[name]
    return new Icon(name, hex, title, svg)
  }
}
