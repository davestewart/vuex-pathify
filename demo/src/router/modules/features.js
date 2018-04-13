import { route } from '../'

import Basics from 'examples/features/Basics'
import Store from 'examples/features/Store'

export default [
  route('/features/basics', Basics),
  route('/features/helpers/store', Store),
]
