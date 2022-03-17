
# Pathify 101

> How Pathify does what it does

Pathify's aim is to **simplify** the overall Vuex development experience.

Its core mechanism is a custom [path syntax](/guide/paths.md) which can reference any state property:

```js
'products/items@filters.search'
```

Paths are [mapped](/setup/mapping.md) to store members via a configurable naming scheme:

```js
Operation       Member          Name            Scheme

read            state           foo             // base name
read            getters         foo             // no prefix, no case conversion
write           mutations       SET_FOO         // "set" prefix, constant case, 
write           actions         setFoo          // "set" prefix, camel case, 
``` 

Store [access](/guide/accessors.md) and component [wiring](/guide/component.md) are unified with `get()`, `set()`, `sync()` and `call()` methods:

```js
// global
const items = store.get('products/items')
store.set('products/items', items)

// component
computed: {
  total: get('products/total'),
  items: sync('products/items')
},

methods: {
  submit: call('products/submit')
}
```

Implementation details are simplified by [prioritising](/guide/properties.md) **getters over state** and **actions over mutations**:

```js
Pathify                                     Vuex
      
store.get('products/items')           <-    store.getters['products/items']
                                            store.state.products.items
store.set('products/items', items)    ->    dispatch('products/setItems', items)
                                            commit('products/SET_ITEMS', items)
```


The overall approach results in a significant simplification of Vuex's API:
 
- from **4** operations, **4** helpers, **3** accessor syntaxes and **3** (or sometimes **4**) naming formats
- to **4** methods and **1** path format

For store members that don't fit the "set/get" paradigm, there are several [direct access](/guide/properties.md#direct-property-access) mechanisms available.

Finally, [store helpers](/guide/store.md) provide transparent sub-property access whilst **eliminating** store setup boilerplate:

```js
const mutations = make.mutations(state)
```


The end result a **radical** reduction in store setup, component wiring, lines of code and cognitive overhead, leaving you more time and bandwidth to build your application.
