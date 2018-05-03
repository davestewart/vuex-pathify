# Path syntax

> Access the store and its properties with a powerful, declarative path syntax

## Overview

Pathify provides a rich [path syntax](#core-syntax) to access Vuex stores, including:

- module, property and sub-property access
- wildcard expansion

There are some additional [direct syntaxes](#direct-syntax) as well, which are designed to handle customisation around non `get/set` naming:

- direct access
- direct sync


## Usage

Paths are used throughout Pathify:

```js
// global
store.get('value')
store.set('module/foo', 100)

// components
computed: {
  value: sync('module/bar@baz')
}
```

See the path syntax [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo?initialpath=api/paths) for an editable, live example.



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

!> Note that Pathify only supports Object (not array) access. Arrays should be updated using manual methods

Sub-property access requires the `@` character, and allows you to read sub-properties to any depth:

```js
// 'red'
get('filters@search')
```
```js
// 'id'
get('filters@sort.key')
```

To transparently **write** sub-properties, use the [make.mutations()](/api/store.md#make-mutations) helper or the [Payload](/api/properties.md#payload-class) class.

```js
set('filters@search', 'blue')
```

See the [sub-property access](/api/properties.md#sub-property-access) section for more information.


### Wildcard syntax

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

### Direct syntax

Pathify has two syntax types which are used to handle customisation around non get/set naming. 

#### `Direct access`

Direct access syntax uses a bang `!` to skip mapping and access Vuex members directly:

```js
set('updateItems!', items)
```

See the [properties](/api/properties.md#direct-property-access) page for more info.

#### `Direct sync`

Direct sync syntax uses a pipe `|` to specify alternate get and set members in component helpers:

```js
computed: {
    items: sync('updatedItems|updateItems!')
}
```

See the [component helpers](/api/component.md#sync) page for more info.
