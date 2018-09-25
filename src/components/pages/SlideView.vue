<template>
  <div class="container">
    <div class="top">

    </div>
    <div class="content">
      <img class="background" src="http://ossweb-img.qq.com/images/lol/web201310/skin/big84008.jpg" alt="">
    </div>
    <div class="right">
      
    </div>
    <div class="footer">
      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
@import 'common/css/variable.scss';

  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: $color-background;
    color: $color-text;
    z-index: 150;
    .content {
      display: flex;
      align-items: center;
      height: 100%;
      .background {
        width: 100%;
      }
      &.content-rotate {
        justify-content: center;
        height: initial;
        .background {
          transform: rotate(90deg);
          width: initial;
        }
      }
    }
  }
</style>
