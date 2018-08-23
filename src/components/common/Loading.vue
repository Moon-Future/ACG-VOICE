<template>
  <div class="loading">
    <img :src="src" alt="loading.pic">
    <p v-if="showTitle" class="title">{{ title }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: require('assets/loading-2.gif')
      },
      title: {
        type: String,
        default: '正在载入...'
      },
      showTitle: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading {
    img {
      width: 100%;
    }
  }
</style>
