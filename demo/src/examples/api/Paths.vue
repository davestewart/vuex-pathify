<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Path syntax</h2>
      <blockquote>
        <p>A unified path syntax provides expressive property and sub-property access to any store or module</p>
        <edit-code src="examples/api/Paths.vue"/>
        <edit-code src="examples/api/vuex/root.js" label="Edit root store"/>
        <edit-code src="examples/api/vuex/module.js" label="Edit module store"/>
        <edit-code src="examples/api/vuex/wildcards.js" label="Edit wildcards store"/>
        <view-docs src="api/paths"/>
      </blockquote>
    </div>


    <div class="content">
      <p>Root property:</p>
      <pre>{{ prop }}</pre>

      <p>Module property:</p>
      <pre>{{ module }}</pre>

      <p>Sub-property:</p>
      <pre>{{ subProp }}</pre>

      <p>Deeply-nested property:</p>
      <pre>{{ deepProp }}</pre>

      <p>Property wildcards:</p>
      <pre>{{ { a, b, c, a2, b2, c2 } }}</pre>

      <p>Sub-property wildcards:</p>
      <pre>{{ { x, y, z } }}</pre>
    </div>

  </article>

</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    computed: {
      // root value
      prop      : get('value'),

      // module values
      module    : get('module/value'),
      subProp   : get('module/object@value'),
      deepProp  : get('module/object@a.b.c'),

      // wildcards
      ...get('wildcards/*'), // get all properties (including getters)
      ...get('wildcards/object@*') // get all sub-properties
    }
  }

</script>

