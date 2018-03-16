# Resolvers

> Write a custom function to map paths to appropriate store members

## Overview

Pathify uses a configurable algorithm in order to map Pathify paths to Vuex store members:

```js
operation + path            accessor         resolver          store member

get('products/items')  ->   state      ->   'items'       ->   state.products.items
                            getter     ->   'items'       ->   getters['products/items']
set('products/items')  ->   mutation   ->   'SET_ITEMS'   ->   commit('products/SET_ITEMS')
                            action     ->   'setItems'    ->   dispatch('products/setItems')
```

The configurable part of the algorithm is the “resolver” – a **user-definable** function who's job it is to determine a **likely name** for a store member in response to the **given parameters**:

```js
function (type, name) {
  // return likely name
}
```

Pathify ships with two buit-in resolvers, `common` and `simple`, but you can also write your own.

## Custom resolvers

A resolver function at its simplest is just a `switch/case`, some concatenation and formatting.

The function takes the following arguments, and must return a string:

- type       `{string}` - The member type, i.e `state`, `getters`, `mutations`, or `actions`
- name       `{string}` - The name of the property being targeted, i.e. `value`
- formatters `{object}` - A hash of common formatting functions, `camel`, `snake`, `const`


### Writing a resolver

A custom resolver that transforms all store members might be:

```js
function resolver (type, name, formatters) {
  switch(type) {
    case 'mutations':
      return formatters.const('set', name) // SET_BAR
    case 'actions':
      return formatters.camel('set', name) // setBar
    case 'getters':
      return formatters.camel('get', name) // getBar
  }
  return name // bar
}
```

You would assign it to Pathify's config like so:

```js
pathify.options.resolver = resolver
```

### Formatter functions

The formatter functions passed as a convenience in as the 3rd argument have two roles:

- concatenate separate words
- convert their case 

There are 3 functions available:

- `camel` - format as `camelCase`
- `snake` - format as `snake_case`
- `const` - format as `CONST_CASE`

As an example:

```js
formatters.const('hello', 'world') // HELLO_WORLD
```