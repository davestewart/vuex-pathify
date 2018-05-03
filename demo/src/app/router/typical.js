import { route } from './index'

import Index from '../views/pages/Typical'
import Pathify from '../../examples/typical/Pathify'
import VuexComputed from '../../examples/typical/VueComputed'
import VuexHelpers from '../../examples/typical/VuexHelpers'

export default [
  route('/code/typical', Index),
  route('/code/typical/pathify', Pathify),
  route('/code/typical/vue-computed', VuexComputed),
  route('/code/typical/vuex-helpers', VuexHelpers),
]
