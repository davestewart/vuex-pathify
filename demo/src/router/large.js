import { route } from './index'

import Index from 'pages/User'
import PathifyImplicit from 'examples/large/views/PathifyImplicit'
import PathifyExplicit from 'examples/large/views/PathifyExplicit'
import VuexComputedLight from 'examples/large/views/VueComputedLight'
import VuexComputedFull from 'examples/large/views/VueComputedFull'
import VuexHelpersFull from 'examples/large/views/VuexHelpersFull'
import VuexHelpersLight from 'examples/large/views/VuexHelpersLight'

export default [
  route('/code/large', Index),
  route('/code/large/pathify-implicit', PathifyImplicit),
  route('/code/large/pathify-explicit', PathifyExplicit),
  route('/code/large/vue-computed-light', VuexComputedLight),
  route('/code/large/vue-computed-full', VuexComputedFull),
  route('/code/large/vuex-helpers-full', VuexHelpersFull),
  route('/code/large/vuex-helpers-light', VuexHelpersLight),
]
