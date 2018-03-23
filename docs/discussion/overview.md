# Plugin overview

> Understand how Pathify works before integrating it in your project

## Pathify 101

Pathify **simplifies** Vuex by abstracting its various syntaxes and methods to **a unified, state-based path syntax**:

```
products/items@filters.search
```

It uses decorators and helpers to get and set values:

```js
const items = store.get('products/items')
```
```js
computed: {
  items: sync('products/items')
}
```

Then programmatically resolves Vuex members or operations:

```js
Pathify                                     Vuex
      
store.get('products/items')           <-    store.state.products.items
                                            store.getters['products/items']
store.set('products/items', items)    ->    commit('products/SET_ITEMS', items)
                                            dispatch('products/setItems', items)
```

The result is a reduction:
 
- from **four** operations, **three** accessor syntaxes and **three** name formats
- to **two** operations and a **single** accessor format.

Note that the Pathify **getters over state** and **actions over mutations**, so if a path resolves successfully to one before the other, it will be chosen. This is designed to reduce decision making for simple get/set operations at the global and component level.

Additionally, Pathify adds significant extra functionality, such as:

- transparent sub-property access
- one-liner, two-way data-binding
- wildcard property expansion
- boilerplate elimination

Hopefully this summary goes some way to illustrating the benefits of using Pathify over vanilla Vuex, but for more detailed information on why Pathify was created, check the [rationale](/discussion/rationale.md) page.

For suggested ways of working most effectively with Pathify, see the [best practices](/discussion/best-practices.md) page.

## The Pathify algorithm

Pathify serves as an **interface** to Vuex, rather than replacing it. Understanding the mechanics of this facade will allow you to work effectively with Pathify in your application.

If you're new to the concept of interfaces or facades, check the [Wikipedia](https://en.wikipedia.org/wiki/Facade_pattern) page.

#### Naming

The first thing to know is that the mapping of paths to state, to getters, mutations or actions uses an **algorithm**, so store members need to be named **predictably**. 

You should choose and stick to a **naming scheme** so that state consistently **maps** to associated members.

Seemingly the most common naming scheme amongst Vue developers (and so the one Pathify ships with) we refer to as the **standard** naming scheme:

```js
state:         foo         // base name
getters:       foo         // no prefix, no case conversion
mutations:     SET_FOO     // "set" prefix, constant case, 
actions:       setFoo      // "set" prefix, camel case, 
``` 


#### Mapping

The realisation of naming schemes **in code** is achieved using a **mapping function** that employs **prefixes**, **concatenation** and **formatting** to return the appropriate names for a given operation:

```js
function (type, name, formatter) {
    // return identifier, e.g. setItems, SET_ITEMS, etc
}
```

Subsequently the matched Vuex member is found, and the **value read**, or the **operation executed**.

For more information see the [mapping](/guide/mapping.md) page.

#### Presets

Pathify ships with a couple of mapping [presets](/guide/mapping.md#) as well as allowing [custom](/guide/mapping.md#custom-function) functions:

name|path|state|getter|mutation|action|notes
:---|:---|:---|:---|:---|:---|:---
**standard**|`/items`|items|items|SET_ITEMS|setItems|Used by most Vue developers
**simple**|`/items`|items|items|items|setItems|Simpler, unified read/write format
**custom**|`/items`|?|?|?|?|Whatever you need for your preferences or project


#### Outcome

The final result of the algorithm is based on:

- the path itself, i.e. `foo/bar`
- the operation type, i.e. `get()` or `set()`
- a prefix per store member, i.e. always use `set` for `mutations`
- a case conversion, i.e. `camelCase` or `CONSTANT_CASE`
- a preference of getters over state, and actions over mutations
- whether the store member exists, i.e. does the `state` have an associated `getter` 

To illustrate the process for all possible operations for the `standard` mapping, we have:

| Operation | Order | Accessor | Prefix | Formatter | Result | Outcome
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| `get()` | 1 | getters |  | none | bar | `state.foo.bar`
|   | 2 | state |  | none | bar | `getters['foo/bar']`
| `set()` | 1 | actions | set | camel | setBar | `dispatch('foo/setBar')`
|   | 2 | mutations | set | const | SET_BAR | `commit('foo/SET_BAR')`


This mapping is used **transparently** by all Pathify's helpers and is what makes Pathify so easy to use.


#### Direct accessor access

It should be noted that Pathify's mapping algorithm is tuned for **get** / **set** operations, so accessors that use alternate nomenclature such as **increment** or **update** should use the [direct member access](/api/paths#direct-member-access) syntax.
