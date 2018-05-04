/**
 * Wildcard example
 *
 * Property and sub-property wildcard access
 */
const state = {

  a: 1,
  b: 2,
  c: 3,

  object: {
    x: 100,
    y: 200,
    z: 300,
  },
}

const getters = {
  a2: state => state.a * 10,
  b2: state => state.b * 10,
  c2: state => state.c * 10,
}

export default {
  namespaced: true,
  state,
  getters,
}
