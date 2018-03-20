# Resolvers

> Configure the mapping of paths to store members

## Overview

The **resolver** function is the configurable part of Pathify's [mapping algorithm](/guide/prerequisites.md) which returns a likely **store member name** for supplied **store member state**, such as `foo` to `SET_FOO` or similar.

It can be configured using a preset or custom function as required.


## Presets

There are two presets to choose from, which are identified by `name` and transform `state` as illustrated:

name|state|getter|mutation|action|notes
:---|:---|:---|:---|:---|:---
`common`|foo|foo|SET_FOO|setFoo|Used by most Vue developers
`simple`|foo|foo|foo|setFoo|Simpler, unified format for reading and writing


To reconfigure Pathify from the default `common` preset, set Pathify's options like so:

```js
pathify.options.resolver = 'simple'
```

## Custom function

If your Vuex naming scheme isn't matched by a preset, you can create your own.

A resolver function at its simplest is just a `switch/case` with some concatenation and formatting:

```js
function (type, name, formatters) {
  switch(type) {
    case 'mutations':
      return formatters.const('set', name) // SET_FOO
    case 'actions':
      return formatters.camel('set', name) // setFoo
    case 'getters':
      return formatters.camel('get', name) // getFoo
  }
  return name // foo
}
```

The function has injected into it the following parameters, and **must** return a string:

- **type**       `{string}` - The member type, i.e `state`, `getters`, `mutations`, or `actions`
- **name**       `{string}` - The name of the property being targeted, i.e. `foo`
- **formatters** `{object}` - A hash of common formatting functions, `camel`, `snake`, `const`


You would assign it to Pathify's config like so:

```js
pathify.options.resolver = function (type, name, formatters) {
    ...
}
```

### Formatters

The formatter functions passed as a convenience in as the 3rd parameter have two roles:

1. concatenate separate words
2. convert their case 

There are 3 functions available:

- `camel` - format as `camelCase`
- `snake` - format as `snake_case`
- `const` - format as `CONST_CASE`

As an example:

```js
formatters.const('set', 'items') // SET_ITEMS
```

You're free to use the built-in formatters, or use 3rd party helpers like [lodash](https://lodash.com/docs/4.17.5#camelCase).