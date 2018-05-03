import _ from 'lodash'
import pathify from './pathify'
import vuexLight from './vuex-light'
import vuexFull from './vuex-full'

export default {
  user1: { ...pathify, state: _.cloneDeep(pathify.state)},
  user2: { ...pathify, state: _.cloneDeep(pathify.state)},
  user3: { ...vuexLight, state: _.cloneDeep(vuexLight.state)},
  user4: { ...vuexFull, state: _.cloneDeep(vuexFull.state)},
  user5: { ...vuexLight, state: _.cloneDeep(vuexLight.state)},
  user6: { ...vuexFull, state: _.cloneDeep(vuexFull.state)},
}
