<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Component helpers</h2>
      <blockquote>
        <p>Component helpers make wiring store properties to components simple and intuitive</p>
        <edit-code src="examples/api/Components.vue"/>
        <edit-code src="examples/api/vuex/module.js"/>
        <view-docs src="api/component"/>
      </blockquote>
    </div>

    <div class="content">

      <p>Store:</p>
      <pre>{{ store }}</pre>

      <p>Sync property: <ui-input v-model.number="value"/></p>
      <p>Sync sub-property: <ui-input v-model="sub"/></p>
      <p>Sync nested property: <ui-input v-model="nested"/></p>

      <p>Nested syntax:</p>
      <pre>{{ { sub, nested } }} </pre>

      <p>Array syntax:</p>
      <pre>{{ { value, string } }} </pre>

      <p>Object syntax:</p>
      <pre>{{ { altValue, altString } }} </pre>
    </div>

  </article>

</template>

<script>
  import { get, sync, commit } from 'vuex-pathify'

  export default {

    computed: {

      // single property
      store: get('module'),

      // accessor priority
      string: get('module/string'),

      // nested property syntax
      sub: sync('module/object@value'),
      nested: sync('module/object@a.b.c'),

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
