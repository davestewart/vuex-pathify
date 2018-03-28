# Mapping

> Configure paths to map to store members

## Overview

Pathify's [algorithm](/guide/pathify.md#the-pathify-algorithm) maps **paths** to **store members**, such as `foo/` to `SET_FOO` or similar.

It can be configured using a preset or custom function.

!> For detailed information on how Pathify maps paths to store members, see the [mapping algorithm](/discussion/algorithm.md) page.


## Presets

There are two mapping presets to choose from, which map as follows:

name|path|state|getter|mutation|action|notes
:---|:---|:---|:---|:---|:---|:---
**standard**|`/foo`|foo|foo|SET_FOO|setFoo|Used by most Vue developers
**simple**|`/foo`|foo|foo|foo|setFoo|Simpler, unified format


To reconfigure Pathify from the default `standard` mapping, set Pathify's options like so:

```js
pathify.options.mapping = 'simple'
```

## Custom function

If your naming scheme isn't covered by a mapping preset, you can supply a custom mapping function.

A mapping function at its simplest is just a `switch/case` with some concatenation and formatting:

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

The function is called with the following parameters, and **must** return a string:

- **type**       `{string}` - The member type, i.e `state`, `getters`, `mutations`, or `actions`
- **name**       `{string}` - The name of the property being targeted, i.e. `foo`
- **formatters** `{object}` - A hash of common formatting functions, `camel`, `snake`, `const`


You assign it to Pathify's options like so:

```js
pathify.options.mapping = function (type, name, formatters) {
    // your custom mapping
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