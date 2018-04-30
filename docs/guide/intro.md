
# Pathify 101

> A quick intro to how Pathify works

Pathify exists to **simplify** the everyday Vuex development experience.

It does this by abstracting its various practices, syntaxes and methods to a unified, state-based, [path syntax](/api/paths.md):

```js
'products/items@filters.search'
```

Store [access](/api/accessors.md) is then expressed in terms of `paths/to/state` and `get()`, `set()` and `sync()` methods:

```js
// global
const items = store.get('products/items')

// component
computed: {
  items: sync('products/items')
}
```

Pathify resolves store members from paths using configurable, programmatic [mapping](/guide/mapping.md): 

```js
Member            Name            Method

state:            foo             // base name
getters:          foo             // no prefix, no case conversion
mutations:        SET_FOO         // "set" prefix, constant case, 
actions:          setFoo          // "set" prefix, camel case, 
``` 


Implementation decisions are further simplified by [prioritising](/api/properties.md) **getters over state** and **actions over mutations**:

```js
Pathify                                     Vuex
      
store.get('products/items')           <-    store.getters['products/items']
                                            store.state.products.items
store.set('products/items', items)    ->    dispatch('products/setItems', items)
                                            commit('products/SET_ITEMS', items)
```


The overall approach results in a significant simplification of Vuex's API:
 
- from **4** operations, **4** helpers, **3** accessor syntaxes and **3** (or sometimes **4**) naming formats
- to **3** methods and **1** path format



Finally, [store helpers](/api/store.md) eliminate store setup boilerplate by generating mutations automatically:

```js
const mutations = make.mutations(state)
```


The bottom line is that Pathify **radically** reduces store setup, wiring and cognitive overhead, leaving you more time and bandwidth to build your application.

