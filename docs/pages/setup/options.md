# Options

> Configure Pathify's options

#### `mapping`

- Type: String | Function
- Default: "standard"

The **mapping** option helps determine how Pathify should map Pathify operations to Vuex store members.

You can choose from a couple of common presets, or provide a custom function.

See the [mapping](/setup/mapping.md) page for more details.

#### `deep`

- Type: Number
- Default: 1

The **deep** option permits sub-property read/write and even creation for store members of the `Object` type:

```js
store.set('sort@order', 'asc')
```

The options are:

- `0` - disable access to sub-properties
- `1` - enable access to existing sub-properties
- `2` - enable creation of new sub-properties

If sub-property creation is enabled, new sub-properties can be created on the fly via both `store.set()` and `sync()`.

Attempting to access or create sub-properties without permission will fail and will generate a console error in development.


#### `strict`

> Not implemented yet

- Type: Boolean
- Default: true

The **strict** option causes an error to be thrown if attempting to access to properties that don't exist.



#### `cache`

> Not implemented yet

- Type: Boolean
- Default: true

The **cache** option enables caching of mapping results, making for speedier lookups when paths are accessed or computed properties are recreated.

Disabling caching has a negligible performance impact.
