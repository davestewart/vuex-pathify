import { route } from './index'

import Index from '../views/pages/Typical'
import Pathify from '../../examples/typical/views/Pathify'
import VuexComputed from '../../examples/typical/views/VueComputed'
import VuexHelpers from '../../examples/typical/views/VuexHelpers'

export default [
  route('/code/typical', Index),
  route('/code/typical/pathify', Pathify),
  route('/code/typical/vue-computed', VuexComputed),
  route('/code/typical/vuex-helpers', VuexHelpers),
]
