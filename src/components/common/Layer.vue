<template>
  <div class="layer" ref="layer" v-show="show">
    <div class="content">
      <div class="header">
        <div class="title">
          <slot name="title">角色名</slot>
        </div>
        <i class="iconfont icon-acg-close i-close" @click="hide"></i>
      </div>
      <div class="scroll-container">
        <scroll :data="desc">
          <div class="body">
            <img class="avatar" :src="avatar" alt="">
            <div class="desc" v-html="desc"></div>
          </div>
        </scroll>
      </div>
      <div class="footer">
        <span class="more">查看更多</span>
      </div>
    </div>
    <div class="arrow-up"><i class="iconfont icon-acg-arrow-up"></i></div>
    <div class="mask" @click="hide"></div>
  </div>
</template>

<script>
  import Scroll from 'components/common/Scroll'
  export default {
    name: 'Layer',
    props: {
      target: null,
      show: {
        type: Boolean,
        default: false
      },
      avatar: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: '角色介绍'
      }
    },
    components: {
      Scroll
    },
    methods: {
      hide() {
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
    .scroll-container {
      min-height: 5rem;
      max-height: 11rem;
      overflow: hidden;
      .body {
        padding: 10px 10px 0 10px;
        .avatar {
          width: 5rem;
          height: 5rem;
          padding-right: 5px;
          padding-top: 2px;
          float: left;
        }
        .desc {
          line-height: 17px;
          font-size: $font-size-small;
        }
      }
    }
    .footer {
      height: 2rem;
      line-height: 2rem;
      margin-top: 10px;
      text-align: center;
      border-top: 1px solid $color-gray;
      color: $color-blue;
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