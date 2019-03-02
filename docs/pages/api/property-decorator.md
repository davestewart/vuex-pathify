# Component property decorators

> **Optional** component property decorators for **single property access** to be used with class based components

## Overview

Component property decorators are included to let [component helpers](api/component) to be used with class based
vue components easily.

They are **single property access equivalents** of their [component helpers](api/component) counterpart. For details of single property access see [single-property-access](api/component?id=single-property-access)

Note that decorators require [`vue-class-component`](https://github.com/vuejs/vue-class-component), but it is not installed by this library by default. If you are using class based vue components, you already included [`vue-class-component`](https://github.com/vuejs/vue-class-component) nonetheless.

## Usage

The following gives an example of some of the main features:

**ES**

```js
import { get, sync, call } from 'vuex-pathify'

// component
@Components
export default class Item extends Vue {
  @get('products/items') items
  @sync('products/tax') tax
  @call('products/setDiscount') setDiscount
}
```

**TS**

```js
import { get, sync, call } from 'vuex-pathify'

// component
@Components
export default class Item extends Vue {
  @get('products/items') items!: Item[]
  @sync('products/tax') tax!: number
  @call('products/setDiscount') setDiscount!: (rate: number) => any
}
```

which is equivalent of

```js
export default {
  computed: {
    items: get('products/items'),
    tax: sync('products/tax'),
  methods: {
    setDiscount: call('products/setDiscount')
  }
}
```

## API

Please see [component helpers' single-property-access API](api/component?id=single-property-access).