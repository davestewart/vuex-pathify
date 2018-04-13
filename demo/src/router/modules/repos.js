import { route } from '../'

import Index from 'pages/Repos'
import Pathify from 'examples/code/repos/Pathify'
import VuexComputed from 'examples/code/repos/VuexComputed'
import VuexHelpers from 'examples/code/repos/VuexHelpers'

export default [
  route('/code/repos', Index),
  route('/code/repos/pathify', Pathify),
  route('/code/repos/vue-computed', VuexComputed),
  route('/code/repos/vuex-helpers', VuexHelpers),
]
