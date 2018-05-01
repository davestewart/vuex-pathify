/**
 * .txt extension added to work round inline loader bug in CodeSandbox
 *
 * @see https://github.com/CompuIves/codesandbox-client/issues/747
 */
export default {
  'snow': require('!raw-loader!./snow.svg.txt'),
  'wind': require('!raw-loader!./wind.svg.txt'),
  'leaf': require('!raw-loader!./leaf.svg.txt'),
  'hail': require('!raw-loader!./hail.svg.txt'),
  'storm': require('!raw-loader!./storm.svg.txt'),
  'cloudy': require('!raw-loader!./cloudy.svg.txt'),
  'autumn': require('!raw-loader!./autumn.svg.txt'),
  'rainbow': require('!raw-loader!./rainbow.svg.txt'),
  'tornado': require('!raw-loader!./tornado.svg.txt'),
  'sunrise': require('!raw-loader!./sunrise.svg.txt'),
}
