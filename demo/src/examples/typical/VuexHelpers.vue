<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Typical component: </span>Vuex helpers</h2>
      <blockquote>
        <p>Demo uses mapState, mapGetters, mapMutations, deep watcher, manual event handlers</p>
        <edit-code src="examples/typical/VuexHelpers.vue"/>
        <edit-code src="examples/typical/vuex/vuex-light.js"/>

      </blockquote>
    </div>

    <div class="controls field is-horizontal">
      <!-- input handlers need to be unique -->
      <!-- sub-property handlers need to pass complex arguments -->
      <ui-select label="Language"
                 :value="filters.language"
                 options="JavaScript PHP Ruby Python CSS Go"
                 @input="SET_FILTERS({key: 'language', value: $event})" />
      <ui-select label="Type"
                 options="framework library toolkit utility state data CMS graph game"
                 prompt="Any"
                 :value="filters.type"
                 @input="SET_FILTERS({key: 'type', value: $event})" />
      <ui-select label="Sort key"
                 options="stars name author license"
                 :value="sort.key"
                 @input="SET_SORT({key: 'key', value: $event})" />
      <ui-select label="Sort order"
                 options="asc desc"
                 :value="sort.order"
                 @input="SET_SORT({key: 'order', value: $event})" />
      <ui-input label="Keyword"
                :value="filters.keyword"
                @input="SET_FILTERS({key: 'keyword', value: $event})" />
    </div>

    <repo-collection :status="status" :repos="repos"/>

  </article>
</template>

<script>
  import base from './ui/base'

  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {

    extends: base('repos2'),

    computed: {
      // getters use mapGetters
      ...mapGetters('repos2', {
        repos: 'filteredItems'
      }),

      // state uses mapState
      ...mapState('repos2', [
        'status',
        'filters',
        'sort'
      ])
    },

    watch: {
      // complex properties require deep watcher
      filters: {
        handler: 'load',
        deep: true,
      },
    },

    methods: {
      // mutations require longhand SET_X commit format
      ...mapMutations('repos2', [
        'SET_ITEMS',
        'SET_STATUS',
        'SET_SORT',
        'SET_FILTERS',
      ])
    }

  }
</script>
