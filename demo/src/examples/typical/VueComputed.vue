<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Typical component: </span>Vue computed</h2>
      <blockquote>
        <p>Demo uses one and two-way computed properties, state, getters and commits, object and array syntax</p>
        <edit-code src="examples/typical/VueComputed.vue"/>
        <edit-code src="examples/typical/vuex/vuex-light.js"/>
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

    <repo-collection :status="status" :repos="repos" />

  </article>
</template>

<script>
  import base from './ui/base'

  export default {

    extends: base('repos2'),

    computed: {
      // getters use array syntax for modules
      repos () {
        return this.$store.getters['repos2/filteredItems']
      },

      // state uses object syntax
      status () {
        return this.$store.state.repos2.status
      },

      // 2-way sync requires multiple, unique, complex computed properties; 1 per property
      language: {
        get () {
          return this.$store.state.repos2.filters.language
        },
        set (value) {
          this.$store.commit('repos2/SET_FILTERS', {key: 'language', value: value})
        }
      },

      type: {
        get () {
          return this.$store.state.repos2.filters.type
        },
        set (value) {
          this.$store.commit('repos2/SET_FILTERS', {key: 'type', value: value})
        }
      },

      keyword: {
        get () {
          return this.$store.state.repos2.filters.keyword
        },
        set (value) {
          this.$store.commit('repos2/SET_FILTERS', {key: 'keyword', value: value})
        }
      },

      sortKey: {
        get () {
          return this.$store.state.repos2.sort.key
        },
        set (value) {
          this.$store.commit('repos2/SET_SORT', {key: 'key', value: value})
        }
      },

      sortOrder: {
        get () {
          return this.$store.state.repos2.sort.order
        },
        set (value) {
          this.$store.commit('repos2/SET_SORT', {key: 'order', value: value})
        }
      },

    },

  }
</script>
