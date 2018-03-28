# Vuex Pathify

> Pathify provides a declarative, path-based interface to your Vuex store


[](assets/html/slideshow.html ':include')
<style>
iframe {
    height: 420px;
    border: 0 !important;
    margin-bottom: -20px;
    overflow: hidden;
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

Pathify does this **all within the bounds of Vuex**; no hacks, just [configuration](/guide/config.md), [path syntax](/api/paths.md), and [helpers](/api/component.md).

Pathify generates concise, lightweight code; the kind **you would have liked to have written anyway** – minus the drudgery – with additional well thought-out functionality that makes working with Vuex a breeze. 

In practical terms, Pathify results in:

- less cognitive overhead
- zero store boilerplate
- one-liner wiring
- cleaner code
- less code

### Next steps

- Check out the [Pathify 101](/guide/pathify.md) for the essential Pathify info
- Visit the [Setup](/guide/setup.md) page to start using Pathify now
- Play with the editable [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo).

