# Vuex Pathify

> Pathify provides a declarative, path-based interface to your Vuex store


[](assets/html/slideshow.html ':include')
<style>
iframe {
    height: 420px;
    border: 0 !important;
    margin-bottom: -20px;
}
</style>


<!--
Firstly, **everything** is a path:

```actionscript
store.get('settings/loaded')
```

You can **write** as easily as you read, even to store **sub-properties**:

```actionscript
store.set('settings/theme@color', color)
```

Component wiring is a snap, with **one-liner**, **two-way** data binding:

```actionscript
computed: {
    order: sync('products/filters@sort.order')
}
```
-->

Pathify does this **all within the bounds of Vuex**; no hacks, just [configuration](/guide/config.md), [path syntax](/api/paths.md), and [helpers](/api/component.md) which return robust, lightweight functions; the kind **you would have written anyway**, but by-hand, and without the whistles and bells. 

In practical terms, Pathify results in:

- less cognitive overhead
- zero store boilerplate
- one-liner wiring
- cleaner code
- less code

### Next steps

Check out the [getting started](/guide/prerequisites.md) section, or play with the editable [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo).

