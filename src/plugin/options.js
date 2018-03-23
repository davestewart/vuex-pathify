export default {
  mapping: 'standard',  // map states to store members using the "standard" scheme
  strict: true,         // throw an error if the store member cannot be found
  cache: true,          // cache generated functions for faster re-use
  deep: true,           // allow sub-property access to Vuex stores
}
