/**
 * .txt extension added to work round inline loader bug in CodeSandbox
 *
 * @see https://github.com/CompuIves/codesandbox-client/issues/747
 */
export default {
  'tent': require('!raw-loader!./tent.svg.txt'),
  'kayak': require('!raw-loader!./kayak.svg.txt'),
  'plane': require('!raw-loader!./plane.svg.txt'),
  'yacht': require('!raw-loader!./yacht.svg.txt'),
  'beach': require('!raw-loader!./beach.svg.txt'),
  'balloon': require('!raw-loader!./balloon.svg.txt'),
  'cocktail': require('!raw-loader!./cocktail.svg.txt'),
  'cable car': require('!raw-loader!./cable-car.svg.txt'),
  'ice cream': require('!raw-loader!./ice-cream.svg.txt'),
}
