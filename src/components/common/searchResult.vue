<template>
  <div class="search-result" ref="searchResult" v-show="showFlag">
    gghghgrghr
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .search-result {
    position: fixed;
    top: 2rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-white;
  }
</style>
