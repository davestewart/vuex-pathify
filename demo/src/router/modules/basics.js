import { route } from '../'

import Home from 'views/components/Home'
import Basic from 'views/examples/features/Basic'
// import User from 'views/pages/basics/User'

export default [
  route('/', Home),
  route('/basic', Basic),
]
