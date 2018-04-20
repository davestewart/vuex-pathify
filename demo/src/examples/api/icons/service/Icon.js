import css from '!!raw-loader!./styles.css'

/**
 * Icon class
 *
 * Encapsulate icon drawing logic independently from view or store
 */
export default function Icon (name, color, title, svg) {
  this.name = name
  this.color = color
  this.title = title

  this.getSvg = function () {
    return svg
  }
}

/**
 * Custom Icon methods
 */
Icon.prototype = {

  /**
   * Get styled SVG outlines
   */
  render (style = 'line') {
    // variables
    const styles = {
      line: {
        line: this.color,
        layers: []
      },

      outline: {
        line: '#FFFFFF',
        layers: [
          { width: 50, color: this.color }
        ]
      },

      pathify: {
        line: '#2C3E50',
        layers: [
          { width: 50, color: '#000000', opacity: 0.1 }
        ]
      },

      sticker: {
        line: this.color,
        layers: [
          { width: 57, color: '#EEEEEE' },
          { width: 50, color: '#FFFFFF' },
        ]
      },

      neon: {
        line: 'white',
        layers: [
          { width: 120, color: this.color, opacity: 0.05 },
          { width: 60, color: this.color, opacity: 0.1 },
          { width: 30, color: this.color, opacity: 0.2 },
          { width: 10, color: this.color, opacity: 0.8 },
        ]
      },
    }

    // helper functions
    function makeLayer (fill) {
      return g
        .replace(/<(circle|path|rect) (.+)\/>/g, (match, node, svg) => {
          return `<${node} stroke="${fill.color}" stroke-width="${fill.width * 2}" ${svg} />`
        })
        .replace('<g>', `<g class="${fill.class || ''}" style="opacity: ${fill.opacity || 1}">`)
        .replace(/#000000/g, fill.color)
    }

    // data
    const rx = /<g>[\s\S]+<\/g>/
    const data = styles[style]
    let svg = this.getSvg()
    let g = String(svg.match(rx))

    // make line
    const line = g
      .replace('<g', '<g class="line"')
      .replace(/#000000/g, data.line)

    // make layers
    let fillWidth = 100
    let layers = []
    data
      .layers
      .forEach(fill => {
        layers.push(makeLayer(fill))
        if (fill.width > fillWidth) {
          fillWidth = fill.width
        }
      })

    // stacking is different for neon
    const layersSvg = style === 'neon'
      ? `<g class="neon">${layers.slice(0,3).join('')}</g>${layers[3]}`
      : layers.join('')

    // add styles
    addStyles()

    // render
    return svg
      .replace('<svg', `<svg data-style="${style}"`)
      .replace('0 0 512 512', `-${fillWidth} -${fillWidth} ${512 + fillWidth * 2} ${512 + fillWidth * 2}`)
      .replace(rx, layersSvg + line)
  },

}

function addStyles () {
  if (!document.getElementById('icon-styles')) {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.setAttribute('id', 'icon-styles')
    style.innerHTML = css
    document.querySelector('head').appendChild(style)
  }
}
