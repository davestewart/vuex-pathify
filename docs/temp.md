# Pathify


Pathify provides a declarative, path-based facade to your Vuex stores:

```actionscript
// global
store.set('products/filters@sort.key', value)

// computed
sortKey : sync('products/filters@sort.key')

mutations = makeMutations(state)

computed: syncSome('items', ['sort', 'key'])

computed: {
    order: sync('items/props@order')
}
```

## Purpose

It allows you to get, set and sync data using a single unified syntax:

```javascript
get('products/items@sort.order')
set('products/items@sort.key', 'name')
```

Component and store helpers turn repetitive, complex tasks into one liner functions:

```
// make 20 mutations, all with sub-property access
const mutations = makeMutations(state)
```
```javascript
// two-way data bind sub-properties
computed: {
    syncSome ('products/items@sort', {
      sortOrder: 'order',
      sortKey: 'key',
    })
}
```

## Pathify vs Vuex

The result is zero-boilerplate, zero-cruft code and massive productivity gains:

    Vuex lines of code: 250
    Pathify lines of code: 100
    Saving: 60%

It does all this transparently; your stores are still Vuex and you still use DevTools.




<p class="tip">This is a thing!</p>

# Vuex Pathify

## Overview

Pathify provides a declarative and intuitive path interface to Vuex stores.

![image](https://user-images.githubusercontent.com/132681/37240859-d763f3ca-2448-11e8-9f41-0f90ac1f084b.png)

The package aims to resolve several everyday Vuex issues:

- inconsistent interface for state, getters, mutations and actions
- tight coupling with components required to know store implementation 
- store bloat due to "pass-through" getters, mutations and actions
- component bloat due to two-way data binding setup
- general Vuex-related code verbosity

In practical terms, Pathify results in:

- zero store boilerplate
- one-liner component wiring
- overall cleaner code

Click the [comparisons](docs/discussion/code-comparisons.md) links as you read though below, for real-world examples.

## Store plugin

### Property access

The [Vuex plugin](docs/api/plugin.md) adds path syntax directly to the your project's store. 

You can read from `getters` or `state` simply by supplying a path:

```js
const items = store.get('products/items')
```

More powerfully you can write to the store the same way:

```js
store.set('products/items', data)
```

Behind the scenes, Pathify executes `commit()` or `dispatch()` calls as if they were written manually. 

> ##### *View [syntax juggling](docs/discussion/code-comparisons.md#syntax-juggling) comparisons here*


### Sub-property access

Sub-property access allows complex `Object` options to be declared in store and managed transparently.

Use `@property` syntax in any of Pathify's functions or helpers:

```js
store.set('products/params@sort.order', 'ASC')
```

View [sub-property access](docs/discussion/code-comparisons.md#sub-property-access) comparisons here.

## Helpers OK


#
## Summary

Pathify provides a declarative and intuitive path interface to Vuex stores.

It uses configuration and reflection to abstract usually complex wiring into elegant one-liners, whilst keeping store implementation details out of your components.

It offers a significant reduction or even total removal of boilerplate, resulting in cleaner, leaner stores and easy-to-read components.

Finally it provides transparent sub-property access, making it cleaner and simpler to manage complex values.

Yet, it's all still Vuex!

## Next steps

Check out the interactive Code Sandbox demo:

- [Demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo)

Check out the docs:

- [Documentation](docs/index.md)


