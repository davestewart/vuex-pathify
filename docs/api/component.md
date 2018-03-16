# Component helpers

> Component helpers take the pain out of wiring

### Read properties

Use `get()` to read automatically from `getters` or `state`: 

```js
computed: {
    results: get('products/items')
}
```

### Sync properties

More powerfully, use `sync()` for one-liner, two-way data binding: 

```js
computed: {
    filter: sync('products/filter'),
}
```

You can sync multiple properties at once:

```js
computed: {
    ...getSome('products', [
        'items',
        'filter',
    ]),
}
``` 

Use the `object` format to change key names or map sub-properties:

```js
computed: {
    ...syncSome('products/sort', {
        sortOrder: '@order'
        sortKey: '@key'
    })
}
``` 

View [computed property](docs/discussion/code-comparisons.md#computed-properties) comparisons here.
