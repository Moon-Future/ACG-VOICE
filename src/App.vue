<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="top">
      <div class="logo">
        <img :src="logoImg" alt="logo">
        <span>dudulu</span>
      </div>
      <div class="search">
        <i class="iconfont icon-acg-search"></i>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      logoImg: require('./assets/flower.png')
    }
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .top {
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: center;
    padding: 5px 0;
    .logo {
      display: flex;
      img {
        width: 2rem;
        margin-right: 3px;
      }
    }
    .search {
      position: absolute;
      right: 3px;
      i {
        font-size: 1.5rem;
        cursor: pointer;
      }
    }
  }
</style>
