<template>

  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="content" v-html="html"></div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>

</template>

<script>
  export default {
    props: {
      html: String
    },
  }
</script>

<style scoped>
  .modal-content {
    background: white;
    border-radius: 5px;
    padding: 25px;
    width: 80vw;
    height: 80vh;
  }
</style>