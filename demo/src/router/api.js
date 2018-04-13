import { route } from './index'

import Paths from 'examples/api/views/Basics'
import Store from 'examples/api/views/Store'
import Component from 'examples/api/views/Component'

export default [
  route('/api/paths', Paths),
  route('/api/store-helpers', Store),
  route('/api/component-helpers', Component),
]
