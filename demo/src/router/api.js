import { route } from './index'

import Paths from '../examples/api/views/Paths'
import Properties from '../examples/api/views/Properties'
import Store from '../examples/api/views/Store'
import Components from '../examples/api/views/Components'

export default [
  route('/api/paths', Paths),
  route('/api/store-accessors', Store),
  route('/api/component-helpers', Components),
  route('/api/properties', Properties),
]
