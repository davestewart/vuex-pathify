# Options

> Configure Pathify's options

## resolver: `String | Function`

> discuss built-in resolvers, but move the custom stuff to the resolver page

The most important option is the **resolver** option, which determines how Pathify should map paths to Vuex store members. You can choose from some **presets**, or you can supply a [user-defined](#custom-resolver) function.

asasas


scheme|state|getter|mutation|action|notes
:---|:---|:---|:---|:---|:---
`common`|foo|foo|SET_FOO|setFoo|Used by most Vue developers
`simple`|foo|foo|foo|setFoo|Single unified format for reading and writing

If you get the following error, you failed to configure the plugin before using it, so should check your setup again:

Writing your own resolver function is as simple as you see above, just make sure to load your configuration correctly as outlined in the [Configuration](/guide/config) page.

```text
Uncaught Error: [Vuex Pathify] Unknown resolver 'none' in options
    - Choose one of 'common', 'simple'
    - Or, supply a custom function
```


#### Custom resolver


## deep : `Boolean`

Allows sub-property acesss

## strict: `Boolean`



### Naming scheme

Before even importing Pathify, you should have a concrete idea of your Vuex variable naming scheme:

- will you use `set` or `update` as your `mutation` prefix ?
- will you use `camelCase` or `CONSTANT_CASE` for `mutations` ?
- will you use one of the Pathify naming presets, or a custom function?






#### Built-in resolvers

Pathify comes with two built-in resolvers, `common` and `simple`.

The `common` Pathify resolver function looks like this.

```js
function resolve (type, name, formatters) {
  switch(type) {
    case 'mutations':
      return formatters.const('set', name) // SET_BAR
    case 'actions':
      return formatters.camel('set', name) // setBar
  }
  return name // bar
}
```

The `simple` Pathify resolver function looks like this:

```js
function resolve (type, name, formatters) {
  if (type === 'actions') {
    return formatters.camel('set', name) // setBar
  }
  return name // bar
}
```

You can choose these resolvers by name in the config options by passing a string:

```js
pathify.options.resolver = 'simple'
```
