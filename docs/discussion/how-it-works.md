# How it works

> Detailed info on how Pathify maps paths to store members


## Overview

## The Pathify algorithm

The result of the algorithm is based on several things:

- the path itself, i.e. `products/items`
- the operation type, i.e. `get()` or `set()`
- whether the store member exists, i.e. does the `state` have an associated `getter` 
- a preferred prefix per store member, i.e. always use `set` for `mutations`
- a case conversion, i.e. `camelCase` or `CONSTANT_CASE`

For example, using the [default settings](../guide/config.md) the path `products/items` will map consistently as:

```js
get('products/items')          <-   store.state.products.items
get('products/items')          <-   store.getters['products/items']
set('products/items', items)   ->   commit('products/SET_ITEMS', items)
set('products/items', items)   ->   dispatch('products/setItems', items)
```


Note that this “resolver” function is completely customisable so Pathify should be able to cope.


### Path format


#### TL;DR

Pathify paths are converted to store Vuex values or operations by:

1. determining the Vuex accessor type (getter, mutation, etc)
2. determining the handler via a customisable naming function
3. resolving the member by combining the two 
3. if found, returning a closure
    1.  that either:
        - returns the value of the targeted member, or
        - calls the appropriate Vuex operation  
    2. sets or gets, as appropriate, any sub-properties
5. caching the resulting function to skip future lookups


The principle aim of Pathify is to free developers from a complex and inconsistent API with a **declarative path syntax** that maps 1:1 to the store's state:

```js
// property on the root store
'user'

// property in a module
'products/items'

// sub-property, anywhere
'products/filters@sort.order'
```

In practical terms, thinking about your application **only** in terms of state is useful as it simplifies the mental model (though **it's important the developer still understands the store's architecture** so s/he doesn't make assumptions).

However the question remains - how to map this syntax to Vuex's API of `state`, `getters`, `commit()`, and `dispatch()`?

member | syntax
:-- | :--
path | `'products/items'`
state | `store.state.products.items`
getters | `store.getters['products/items']`
mutations | `store.commit('products/SET_ITEM')`
actions | `store.dispatch('products/setItems')`


### Determining accessors

#### Logic

Pathify tackles this conundrum with the following logic:


1. agree we will only be **getting** or **setting** (rather than updating) data
2. agree we get values via `state` and `getters` and set values via `actions` and `mutations`
3. assume any `state` property will map consistently to other accessor types
4. assume consistent naming formats in the store, i.e. `<name>`,  `SET_<NAME>` and `set<Name>`
5. for identically-named properties, prefer `getters` to `state`, and `actions` to `mutations` 
6. enable said naming formats to be configurable (and easily overridable) per project 

#### Steps

These steps give Pathify the ability to map **paths** to **store members**, the key step being a configurable **resolver function** which returns the correct **accessor name** for a given **operation type** and **state name**:

The function takes the **accessor type**, **state name**, plus a hash of **formatter functions** to enable the developer to easily build and format the resultant member name:

```js
function (type, name, formatters) {
    switch (type) {
        case 'actions':
            return formatters.camel('set', name) // setValue
        case 'mutations':
            return formatters.const('set', name) // SET_VALUE
    }
    return name // value
}
```

(See the [config](config.md) page for further information on configuring the resolver function)

#### Successful mapping

Given these parameters, the following table illustrates possible Vuex outcomes for the Pathify path `"foo/bar"`:


| Operation | Order | Accessor | Prefix | Formatter | Result | Outcom
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| get | 1 | getters |  | none | bar | `state.foo.bar`
| get | 2 | state |  | none | bar | `getters['foo/bar']`
| set | 1 | actions | set | camel | setBar | `dispatch('foo/setBar')`
| set | 2 | mutations | set | const | SET_BAR | `commit('foo/SET_BAR')`

At this point, assuming a store member exists using the configured naming, we should have a value or have performed a Vuex operation!

#### Manual mapping

There are of course occasions where a user will need to access a Vuex property that cannot be properly resolved.

In the case below, the string `items` will **only** resolve to `SET_ITEMS` or `setItems` so the mutation below would be missed:

```js
mutations: {
    UPDATE_ITEMS: (state, value) => state.items = [state.items, ...items]
}
```

Continuing to attempt to set the value will result in an error:

```text
[Vuex Pathify] Unable to resolve path 'items':
    - Did not find action 'setItems' or mutation 'SET_ITEMS' on store
    - Use path 'item!' to target store member directly
```

The user can of course `commit()` manually, or to maintain consistency, use the **direct syntax**:

```js
store.commit('UDPATE_ITEMS', value)
store.set('UDPATE_ITEMS!', value)
```

The key points is that Pathify warns the developer rather than leaving them in the dark.

### Sub-property access

we have the top level store property, so if no properties, we're done!

### Conclusion

Whilst it seems like a lot of gymnastics to save a bit of typing, the function calls`

