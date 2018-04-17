<template>
  <div v-if="status">{{ status }}</div>
  <div v-else-if="repos.length" class="repos">
    <repo-view v-for="repo in repos" :key="repo.id" :repo="repo" />
  </div>
  <div v-else>
    <p>No results</p>
  </div>
</template>

<script>
  import RepoView from './RepoView'

  export default {
    components: {
      RepoView
    },
    props: {
      status: String,
      repos: Array
    }
  }
</script>
