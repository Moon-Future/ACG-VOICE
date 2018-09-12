<template>
  <div class="loading">
    <div class="loading-pic">
      <img :src="src" alt="loading.pic">
    </div>
    <div class="loading-title" v-if="showTitle">
      <p class="title">{{ title }}</p>
    </div>
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
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    flex-flow: column;
    text-align: center;
    img {
      width: 50px;
      height: 100%;
    }
  }
</style>
