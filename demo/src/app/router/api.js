import { route } from './index'

import Paths from '../../examples/api/Paths'
import Store from '../../examples/api/Store'
import Properties from '../../examples/api/Properties'
import Accessors from '../../examples/api/Accessors'
import Components from '../../examples/api/Components'

export default [
  route('/api/paths', Paths),
  route('/api/store', Store),
  route('/api/accessors', Accessors),
  route('/api/component', Components),
  route('/api/properties', Properties),
]
