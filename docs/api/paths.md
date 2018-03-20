# Path syntax

> Access the store and its properties with a powerful, declarative path syntax

## Overview

Pathify provides a rich [syntax](#core-syntax) to access Vuex stores, including:

- module, property and sub-property access
- wildcard expansion

There are some [utility](#utility-syntax) formats as well, which are designed to handle customisation around non `get/set` naming:

- direct member access
- two-way mapping override

To illustrate the examples on this page, we'll use the following example state:

```js
const state = {
    items: [ ... ],
    filters: {
        search: 'red',
        sort: {
            key: 'id',
            order: 'asc',
        }
    }
}
```


## Syntax

### Core syntax

#### `Property access`

Properties are accessed by simply referencing the state name:

```js
// [ ... ]
get('items')
```

#### `Module access`

Modules are accessed by providing the full path to to the module:

If the example above was in a module called `products`, it would be accessed like so:

```js
// [ ... ]
get('products/items')
```


#### `Sub-property access`

Sub-property access requires the `@` character, and allows you to read sub-properties to any depth:

```js
// 'red'
get('filters@search')
```
```js
// 'id'
get('filters@sort.key')
```

!> Note that Pathify only supports Object (not array) access. Arrays should be updated using manual methods

For sub-properties to be **written to** mutations **must have** been created using the [makeMutations()](/api/store.md) helper.

```js
set('filters@search', 'blue')
```

Alternatively, you **can** write manually; see the [Payload](/api/accessors.md#payload) helper for more information.

#### `Wildcard expansion`

Wildcards `*` allow you to reference multiple properties at once, and are used primarily in [component helpers](/api/component.md).

Wildcards don't **return** values like other path references, rather they **generate** a hash of named functions for **all properties that they expand to**, and are usually mixed in using the ES6 spread operator:

```js
// a hash of computed getters for `items` and `filters`
computed: {
  ...get('*') 
}
```

You can use wildcards on top-level modules, properties and sub-properties:

```js
// a hash of computed getters for `search` and `sort`
computed: {
  ...get('filters*')
}
```
```js
// a hash of computed getters for `key` and `order`
computed: {
  ...get('filters@sort.*')
}
```

### Utility syntax

#### `Direct member access`

Pathify's [resolver](/guide/resolvers.md) function is designed to predictably map `state` names to associated store members, like `SET_FOO` or `setFoo`.

For cases where the "set/get" nomenclature doesn't make sense, you can override Pathify's member resolution by appending a bang `!` to the property name:

```js
// reference the `filteredItems` getter, rather than `items`
get('filteredItems!')
```
```js
// call the `updateItems()` action, rather than `setItems()`
set('updateItems!', data)
```

Alternatively, you can just call Vuex members directly:

```js
// use vuex directly
store.commit('updateItems', data)
```

#### `Two-way mapping override`

The computed property helper [sync()](/api/component.md#sync) has a special `|` syntax which allows you to specify an alternate getter **and/or** setter.

You can override one or both properties:

```js
// get items with `items` but override the setItems() action with the `updateItems()`
sync('items|updateItems!')
```

Alternatively, you can specify both the getter and the setter by using the direct access syntax for the getter:

```js
// get items with the `filteredItems` getter and set items with the action `updateItems()`
sync('filteredItems!|updateItems!')
```

