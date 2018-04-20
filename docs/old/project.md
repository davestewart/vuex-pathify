# Prerequisites

> Understand how Pathify works before integrating it in your project

### Overview

Pathify **simplifies** Vuex by abstracting its syntaxes and methods into a single `op(path)` syntax, based on **state**:

```js
const items = get('products/items')
```

Behind the scenes, Pathify performs the conversion to the appropriate Vuex members or methods:

```js
Pathify                               Vuex

get('products/items')           <-    store.state.products.items
                                      store.getters['products/items']
set('products/items', items)    ->    commit('products/SET_ITEMS', items)
                                      dispatch('products/setItems', items)
```

The result (omitting some additional functionality) is a reduction:
 
- from **four** operations, **three** accessor syntaxes and **three** name formats
- to **two** operations and a **single** accessor format.

### The Pathify algorithm

#### Naming

The first thing to know is that the mapping of paths to state, to getters, mutations or actions uses an **algorithm**, so store members need to be named **predictably**. 

You should choose and stick to a **scheme** so that state consistently maps to associated members:

```js
state:         foo         // base name
getters:       foo         // no prefix, no case conversion
mutations:     SET_FOO     // "set" prefix, constant case, 
actions:       setFoo      // "set" prefix, camel case, 
``` 


#### Mapping

The realisation of any such scheme **in code** is achieved using a resolver function that employs **prefixes**, **concatenation** and **formatting** to return the appropriate names for a given operation:

```js
function resolver (type, name, formatter) {
    // return identifier, e.g. setItems, SET_ITEMS, etc
}
```
Pathify ships with a couple of **preset** functions, but also allows for [custom](/guide/resolvers.md) naming:

preset|state|getter|mutation|action|notes
:---|:---|:---|:---|:---|:---
`standard`|items|items|SET_ITEMS|setItems|Used by most Vue developers
`simple`|items|items|items|setItems|Simpler, unified format for reading and writing
`custom`|items|?|?|?|Whatever you need for your preferences or project

To illustrate the process for all possible operations for the `standard` preset, we have:

| Operation | Order | Accessor | Prefix | Formatter | Result | Outcome
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| `get()` | 1 | getters |  | none | bar | `state.foo.bar`
|   | 2 | state |  | none | bar | `getters['foo/bar']`
| `set()` | 1 | actions | set | camel | setBar | `dispatch('foo/setBar')`
|   | 2 | mutations | set | const | SET_BAR | `commit('foo/SET_BAR')`

For more information see the  [resolvers](/guide/resolvers.md) page.

### Outcome

The final result of the algorithm is based on:

- the path itself, i.e. `products/items`
- the operation type, i.e. `get()` or `set()`
- a prefix per store member, i.e. always use `set` for `mutations`
- a case conversion, i.e. `camelCase` or `CONSTANT_CASE`
- a preference of getters over state, and actions over mutations
- whether the store member exists, i.e. does the `state` have an associated `getter` 

This mapping is used transparently by all Pathify's helpers and is what makes Pathify so easy to use.

#### Caveat emptor

It should be noted that Pathify's mapping algorithm is tuned for **get** / **set** operations, so commits that use alternate nomenclature such as **increment** or **update** cannot be handled by Pathify.

In these cases it's simple and expected **to just use Vuex directly**:
 
```js
store.commit('products/updateItems')
``` 
