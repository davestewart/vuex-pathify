import IconFactory from './service/IconFactory'

/**
 * Import the weather icons...
 *
 * (There is also a travel set - try importing them instead!)
 */
import icons from './assets/weather'

const colors = {
  red: '#DD3A77',
  orange: '#ff822d',
  yellow: '#ffc84f',
  grey: '#CCC',
  green: '#05AFAF',
  blue: '#3382bf',
  navy: '#163c7a',
}

// create a new IconFactory to manage icon creation
export default new IconFactory(icons, colors)
