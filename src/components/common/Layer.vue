<template>
  <div class="layer" ref="layer" v-show="show">
    <!-- <div class="arrow"><i class="iconfont icon-acg-arrow-up"></i></div> -->
    <i class="iconfont icon-acg-arrow-up"></i>
    <div class="content">
      <div class="header">
        <i class="iconfont icon-acg-close i-close" @click="hide"></i>
        <div class="title">
          <span class="line"></span>
          <p class="name">艾尼维亚</p>
        </div>
      </div>
      <div class="body">
        <img class="avatar" src="http://ossweb-img.qq.com/images/lol/img/champion/Anivia.png" alt="">
        <div class="desc">
          <p>艾尼维亚nubrogrbjgbsgjbr艾尼维亚艾尼维亚nubrogrbjgbsgjbr艾尼维亚艾尼维亚nubrogrbjgbsgjbr艾尼维亚</p>
        </div>
      </div>
    </div>
    <div class="mask" @click="hide"></div>
  </div>
</template>

<script>
  export default {
    name: 'Layer',
    props: {
      target: null,
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hide() {
        console.log('222')
        this.$emit('hideLayer', false)
      }
    },
    watch: {
      target() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .content {
    line-height: $font-size-large-x;
    max-height: 50%;
    width: 90%;
    background: $color-white;
    position: relative;
    top: 11rem;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 10px;
    z-index: 100;
    .header {
      .i-close {
        position: absolute;
        right: 0;
        padding: 10px;
        color: $color-gray;
        font-size: $font-size-medium-x;
      }
      .title {
        padding: 10px;
        margin-left: 10px;
        width: 80%;
        .line {
          height: $font-size-large-x;
          width: 2px;
          background: $color-blue;
          position: absolute;
        }
        .name {
          text-indent: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .body {
      padding: 10px;
      margin-left: 10px;
      .avatar {
        width: 5rem;
        height: 5rem;
        float: left;
      }
    }
  }
  .mask {
    position: fixed;
    background: red;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background: $color-background;
  }
</style>