# Class component decorators

> **Optional** component property decorators for **single property access** to be used with class based components

## Overview

For developers who prefer class-based component development, Pathify allows you to generate computed properties using the `@decorator` syntax.

They are [single-property-access](api/component?id=single-property-access) equivalents of their [component helpers](api/component) counterpart.

Note that Pathify imports [`vue-class-component`](https://github.com/vuejs/vue-class-component) internally, but this may change in the future.

## Usage

!> **Important syntax difference!** Decorators use Sentence-case, i.e. `Get` and not `get`!

The following gives an example of some of the main features:

**ES**

```js
import { Get, Sync, Call } from 'vuex-pathify'

// component
@Component
export default class Basket extends Vue {
  @Get('products/items') items
  @Sync('products/tax') tax
  @Call('products/setDiscount') setDiscount
}
```

**TS**

```ts
import { Get, Sync, Call } from 'vuex-pathify'

// component
@Component
export default class Basket extends Vue {
  @Get('products/items') items!: Item[]
  @Sync('products/tax') tax!: number
  @Call('products/setDiscount') setDiscount!: (rate: number) => any
}
```

Which is equivalent of:

```js
import { get, sync, call } from 'vuex-pathify'

export default {
  computed: {
    items: get('products/items'),
    tax: sync('products/tax'),
  },
  
  methods: {
    setDiscount: call('products/setDiscount')
  }
}
```

## API

Please see [component helpers' single-property-access API](api/component?id=single-property-access).
