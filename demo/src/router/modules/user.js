import { route } from '../'

import Index from 'pages/User'
import PathifyImplicit from 'views/examples/code/user/PathifyImplicit'
import PathifyExplicit from 'views/examples/code/user/PathifyExplicit'
import VuexComputedLight from 'views/examples/code/user/VueComputedLight'
import VuexComputedFull from 'views/examples/code/user/VueComputedFull'
import VuexHelpersFull from 'views/examples/code/user/VuexHelpersFull'
import VuexHelpersLight from 'views/examples/code/user/VuexHelpersLight'

export default [
  route('/code/user', Index),
  route('/code/user/pathify-implicit', PathifyImplicit),
  route('/code/user/pathify-explicit', PathifyExplicit),
  route('/code/user/vue-computed-light', VuexComputedLight),
  route('/code/user/vue-computed-full', VuexComputedFull),
  route('/code/user/vuex-helpers-full', VuexHelpersFull),
  route('/code/user/vuex-helpers-light', VuexHelpersLight),
]