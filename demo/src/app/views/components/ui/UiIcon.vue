<template>
  <div class="icon-container">
    <span class="icon" @click="$emit('click')" :title="title">
      <span class="svg" v-html="svg"></span>
    </span>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      svg: String,
      title: String
    }
  }
</script>

<style lang="scss" scoped>

  .icon-container {
    display: inline-block;
    width: 150px;
    margin: 5px;
    overflow: hidden;

    > .icon {
      width: 150px;
      height: 150px;
      cursor: pointer;
      margin-bottom: -3px;

      > .svg {
        display: inline-block;
        margin: 20px;
        line-height: 1em;
        transition: 1s all;
        transform: scale(0.9);
      }

      &:hover {
        .svg {
          transition: 0.1s all;
          transform: scale(1.3);
        }
      }

    }

    > .title {
      text-align: center;
      background: white;
      font-size: 0.6em;
      font-weight: 400;
      color: #666;
    }

  }
</style>
