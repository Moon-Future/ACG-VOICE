<template>
  <div class="layer" ref="layer" v-show="show">
    <div class="content">
      <div class="header">
        <div class="title">艾尼维亚</div>
        <i class="iconfont icon-acg-close i-close" @click="hide"></i>
      </div>
      <div class="body">
        <img class="avatar" src="http://ossweb-img.qq.com/images/lol/img/champion/Anivia.png" alt="">
        <div class="desc">
          <p>艾尼维亚nubrogrbjgbsgjbr艾尼维亚艾尼维亚nubrogrbjgbsgjbr艾尼维亚艾尼维亚nubrogrbjgbsgjbr艾尼维亚</p>
        </div>
      </div>
    </div>
    <div class="arrow-up"><i class="iconfont icon-acg-arrow-up"></i></div>
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
      height: $font-size-large-x;
      line-height: $font-size-large-x;
      padding: 10px;
      .title {
        display: inline-block;
        border-left: 2px solid $color-blue;
        padding-left: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 80%;
      }
      .i-close {
        color: $color-gray;
        position: absolute;
        right: 0;
        margin-right: 10px;
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