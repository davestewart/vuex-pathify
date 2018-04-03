import { route } from '../'

import PathifyLight from 'views/examples/users/PathifyLight'
import PathifyFull from 'views/examples/users/PathifyFull'
import VuexComputedLight from 'views/examples/users/VuexComputedLight'
import VuexComputedFull from 'views/examples/users/VuexComputedFull'
import VuexHelpersFull from 'views/examples/users/VuexHelpersFull'
import VuexHelpersLight from 'views/examples/users/VuexHelpersLight'

export default [
  route('/pathify-light', PathifyLight),
  route('/pathify-full', PathifyFull),
  route('/vuex-computed-light', VuexComputedLight),
  route('/vuex-computed-full', VuexComputedFull),
  route('/vuex-helpers-full', VuexHelpersFull),
  route('/vuex-helpers-light', VuexHelpersLight),
]