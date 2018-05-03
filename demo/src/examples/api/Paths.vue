<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Path syntax</h2>
      <blockquote>
        <p>A unified path syntax provides expressive property and sub-property access to any store or module</p>
        <edit-code src="examples/api/Paths.vue"/>
        <edit-code src="examples/api/vuex/api.js"/>
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

      <p>Wildcard:</p>
      <pre>{{ x }} {{ y }} {{ z }}</pre>
    </div>

  </article>

</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    computed: {
      prop      : get('value'),
      module    : get('module/value'),
      subProp   : get('module/object@value'),
      deepProp  : get('module/object@a.b.c'),
      ...get('module/wildcard@*') // implicitly maps sub-properties x, y, z
    }
  }

</script>

