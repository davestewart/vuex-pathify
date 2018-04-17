import { route } from './index'

import Paths from '../examples/api/views/Paths'
import Properties from '../examples/api/views/Properties'
import Accessors from '../examples/api/views/Accessors'
import Components from '../examples/api/views/Components'

export default [
  route('/api/paths', Paths),
  route('/api/accessors', Accessors),
  route('/api/component', Components),
  route('/api/properties', Properties),
]
