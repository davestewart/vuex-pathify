<a id="home" style="position: absolute; top: 0"></a>

# Vuex Pathify

> Pathify provides a declarative, state-based, path interface to your Vuex store

With Pathify, you access Vuex by **path**:

```pathify
'foo/bar@a.b.c'
```

Paths can reference any **module**, **property** or **sub-property**:

![pathify-diagram](../assets/img/readme/pathify-diagram.png)


**Get** or **set** data without **syntax juggling** or worrying about **implementation**:

```pathify
store.get('loaded')
```
```pathify
store.set('loaded', true)
```

Reach into **sub-properties** and **arrays**:

```pathify
store.get('products@items.0.name')
store.set('products@items.1.name', 'Vuex Pathify')
```

Set up **one or two-way** data binding on **any** store value without **bloat** or **fuss**:

```pathify
computed: {
      products: get('products'),
      category: sync('filters@category')
}
```

Wire **multiple** properties (or sub-properties) using **array**, **object** and **wildcard** formats:

```pathify
computed: {
      ...sync('filters@sort', [
            'order', 
            'key'
      ]),

      ...sync('filters@sort', {
            sortOrder: 'order',
            sortKey: 'key'
      }),

      ...sync('filters@sort.*')
}
```


Use **variable expansion** to dynamically reference store properties:

```pathify
computed: {
      product: get('products@items:index')
}
```


Set up mutations – **including sub-property mutations** – in a single line:

```pathify
make.mutations(state)
```

And that's it!

In practical terms, Pathify results in:

- less cognitive overhead
- zero store boilerplate
- one-liner wiring
- cleaner code
- lighter files

### Next steps

To get started:

- visit the [Installation](/setup/install.md) page to install and use Pathify now
- read the [Guide](/guide/paths.md) for a deep dive into Pathify's features
- read the [API](/reference/api.md) to see just the code

To see Pathify in action:

- check the editable CodeSandbox [demos](/intro/demos.md)

For a deeper insight:
 
- read the [Intro](/intro/pathify.md) for an overview of the Pathify mechanism
- check out the [code comparison](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main?initialpath=code) demos which illustrate reductions in Vuex code of between **2 and 14 times** 
