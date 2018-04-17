<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Component helpers</h2>
      <blockquote>
        <p>Component helpers make wiring store properties to components simple and intuitive</p>
        <view-code src="examples/api/views/Components.vue"/>
        <view-docs src="api/component"/>
      </blockquote>
    </div>

    <div class="content">

      <p>Sync property: <ui-input v-model="value"/></p>
      <p>Sync sub-property: <ui-input v-model="sub"/></p>
      <p>Sync nested property: <ui-input v-model="nested"/></p>

      <p>Module:</p>
      <pre>{{ module }}</pre>

      <p>Wildcards:</p>
      <pre>{{ x }} {{ y }} {{ z }} </pre>

      <p>Other wired props:</p>
      <pre>{{ [altValue, altString, x, y, z ] }} </pre>
    </div>

  </article>

</template>

<script>
  import { get, sync, commit } from 'vuex-pathify'

  export default {

    computed: {

      // single property syntax
      module: get('module'),

      // array syntax
      ...sync('module', [
        'value',
        'string'
      ]),

      // object syntax
      ...get('module', {
        altValue: 'value',
        altString: 'string'
      }),

      // nested property syntax
      sub: sync('module/object@value'),
      nested: sync('module/object@a.b.c'),

      // wildcard syntax, maps x, y, z
      ...get('module/wildcard@*'),
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .field {
    max-width: 300px;
    margin: 0.5em 1em;
  }
</style>
