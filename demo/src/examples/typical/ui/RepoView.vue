<template>
  <div class="media">
    <figure class="media-left is-small">
      <a class="image is-48x48" :href="repo.homepageUrl || repo.url" target="_blank">
        <img :src="repo.avatarUrl">
      </a>
    </figure>
    <div class="media-content">
      <div class="content">
        <h5 class="title is-5">{{ repo.name }}</h5>
        <p>{{ repo.description }}</p>
        <span class="icon is-small has-text-warning"><i class="fa fa-star"></i></span> <span class="is-small">{{ repo.stars }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Repo from './Repo'

  export default {
    props: {
      repo: {
        required: true,
        type: Repo
      }
    }
  }
</script>

<style lang="scss" scoped>
  .media {

    h5 {
      margin-top: 0;
      margin-bottom: 0.2em;
      text-transform: capitalize;
    }
    p {
      margin-bottom: 0.3em;
    }
  }

</style>