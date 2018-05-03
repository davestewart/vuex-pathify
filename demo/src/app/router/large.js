import { route } from './index'

import Index from '../views/pages/Large'
import PathifyImplicit from '../../examples/large/PathifyImplicit'
import PathifyExplicit from '../../examples/large/PathifyExplicit'
import VuexComputedLight from '../../examples/large/VueComputedLight'
import VuexComputedFull from '../../examples/large/VueComputedFull'
import VuexHelpersFull from '../../examples/large/VuexHelpersFull'
import VuexHelpersLight from '../../examples/large/VuexHelpersLight'

export default [
  route('/code/large', Index),
  route('/code/large/pathify-implicit', PathifyImplicit),
  route('/code/large/pathify-explicit', PathifyExplicit),
  route('/code/large/vue-computed-light', VuexComputedLight),
  route('/code/large/vue-computed-full', VuexComputedFull),
  route('/code/large/vuex-helpers-full', VuexHelpersFull),
  route('/code/large/vuex-helpers-light', VuexHelpersLight),
]
