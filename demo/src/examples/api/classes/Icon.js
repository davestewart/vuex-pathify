import { icons, names, colors, palette } from './options'

import template from '!!raw-loader!./template.html'

/**
 * Icon class
 *
 * Encapsulate logic independently from view or store
 */
export default function Icon (data) {
  const { name, color } = data
  this.name = name
  this.color = palette[color]
  this.title = `${color} ${name}`
}

Icon.prototype = {

  render (style) {
    // variables
    const styles = {
      line: {
        line: this.color,
        fills: []
      },

      outline: {
        line: '#FFFFFF',
        fills: [
          { width: 50, color: this.color }
        ]
      },

      pathify: {
        line: '#2C3E50',
        fills: [
          { width: 50, color: '#000000', opacity: 0.1 }
        ]
      },

      neon: {
        line: 'white',
        fills: [
          { width: 120, color: this.color, opacity: 0.05 },
          { width: 60, color: this.color, opacity: 0.1 },
          { width: 30, color: this.color, opacity: 0.2 },
          { width: 10, color: this.color, opacity: 0.8 },
        ]
      },

      sticker: {
        line: this.color,
        fills: [
          { width: 57, color: '#EEEEEE' },
          { width: 50, color: '#FFFFFF' },
        ]
      }
    }

    // helper functions
    function makeFill (width, color, opacity = 1) {
      return g
        .replace(/<(circle|path|rect) (.+)\/>/g, (match, node, svg) => {
          return `<${node} stroke="${color}" stroke-width="${width * 2}" ${svg} />`
        })
        .replace('<g>', `<g style="opacity: ${opacity}">`)
    }

    // data
    const rx = /<g>[\s\S]+<\/g>/
    const data = styles[style]
    let svg = icons[this.name]
    let g = String(svg.match(rx))

    // make fills
    let fillWidth = 100
    let fills = ''
    data
      .fills
      .forEach(fill => {
        fills += makeFill(fill.width, fill.color, fill.opacity)
        if (fill.width > fillWidth) {
          fillWidth = fill.width
        }
      })

    // render
    return svg
      .replace('0 0 512 512', `-${fillWidth} -${fillWidth} ${512 + fillWidth * 2} ${512 + fillWidth * 2}`)
      .replace(rx, fills + g.replace(/#000000/g, data.line))
  },

  show () {
    const html = template
      .replace(/{{ file }}/g, `${this.name}.svg`)
      .replace('{{ svg }}', icons[this.name])
    const win = window.open('', 'icon')
    win.document.write(html)
    win.document.close()
  },

}

Icon.create  = function () {
  const random = values => values[Math.floor(Math.random() * values.length)]
  const name = random(names)
  const color = random(colors)
  return {name, color}
}
