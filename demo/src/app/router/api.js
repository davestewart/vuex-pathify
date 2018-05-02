import { route } from './index'

import Paths from '../../examples/api/views/Paths'
import Store from '../../examples/api/views/Store'
import Properties from '../../examples/api/views/Properties'
import Accessors from '../../examples/api/views/Accessors'
import Components from '../../examples/api/views/Components'

export default [
  route('/api/paths', Paths),
  route('/api/store', Store),
  route('/api/accessors', Accessors),
  route('/api/component', Components),
  route('/api/properties', Properties),
]
