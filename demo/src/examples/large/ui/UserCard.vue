<template>
  <div class="card">
    <div class="card-content content">
      <p class="title is-4">{{ data.firstName }} {{ data.lastName }}</p>
      <p class="subtitle is-6"><a :href="'mailto:' + data.email">{{ data.email }}</a> | <a :href="siteUrl" target="user">{{ siteName }}</a> | {{ data.phone }}</p>
      <p>{{ data.street }}<br>{{ data.area }}<br>{{ data.town }}<br>{{ data.zipcode }}<br>{{ data.country }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      user: String
    },

    computed: {
      data () {
        return this.$store.state[this.user]
      },

      siteName () {
        return this.data.website.replace('http://', '')
      },

      siteUrl () {
        return 'http://' + this.siteName
      }
    }
  }
</script>

<style scoped>
  .title {
    padding-bottom: 0.5em;
  }
</style>