<template>
  <div class="top-fixed">
    <div class="top">
      <div class="logo">
        <img :src="logoImg" alt="logo">
      </div>
      <div class="search">
        <i class="iconfont icon-acg-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  data() {
    return {
      logoImg: 'http://paxr4fk3y.bkt.clouddn.com/logo/acgVoice-logo.png'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .top-fixed {
    position: fixed;
    top: 0;
    height: 2rem;
    width: 100%;
    background: $color-background;
    color: $color-text;
    z-index: 999;
  }
  .top {
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: center;
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
