<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Typical component: </span>Pathify</h2>
      <blockquote>
        <p>Demo uses Pathify get and sync functions, sub-property access, object, array, and wildcard syntax</p>
        <edit-code src="examples/typical/Pathify.vue"/>
        <edit-code src="examples/typical/vuex/pathify.js"/>
      </blockquote>
    </div>

    <div class="controls field is-horizontal">
      <ui-select label="Language"
                 options="JavaScript PHP Ruby Python CSS Go"
                 v-model="language"/>
      <ui-select label="Type"
                 options="framework library toolkit utility state data CMS graph game"
                 prompt="Any"
                 v-model="type"/>
      <ui-select label="Sort key"
                 options="stars name author license"
                 v-model="sortKey"/>
      <ui-select label="Sort order"
                 options="asc desc"
                 v-model="sortOrder"/>
      <ui-input label="Keyword"
                v-model="keyword"/>
    </div>

    <repo-collection :status="status" :repos="repos"/>

  </article>
</template>

<script>
  import base from './ui/base'

  import { get, sync } from 'vuex-pathify'

  export default {

    extends: base('repos1'),

    computed: {
      // get + path syntax
      repos: get('repos1/filteredItems'),

      // get + array syntax
      ...get('repos1', [
        'status',
        'readme'
      ]),

      // sync, sub-property + wildcard syntax
      ...sync('repos1/filters@*'),

      // sync, sub-property + object syntax
      ...sync('repos1/sort@', {
        sortOrder: 'order',
        sortKey: 'key',
      }),
    },

  }
</script>
