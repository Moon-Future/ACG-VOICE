<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="top">
      <div class="logo">
        <img :src="logoImg" alt="logo">
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
      logoImg: 'http://paxr4fk3y.bkt.clouddn.com/logo/acgVoice-logo.png'
    }
  }
}
</script>

<style lang="scss">
  @import 'common/css/reset.scss';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 0 10px;
    font-size: 0.875rem;
  }
  .top {
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: center;
    padding: 5px 0;
    .logo {
      display: flex;
      justify-content: center;
      img {
        width: 50%;
        margin-right: 3px;
      }
    }
    .search {
      position: absolute;
      right: 13px;
      i {
        font-size: 1.5rem;
        cursor: pointer;
      }
    }
  }
</style>
