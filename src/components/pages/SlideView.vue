<template>
  <div class="slideview-wrapper">
    <div class="top">
      <div class="back">
        <svg class="iconfont icon-back" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-acg-arrow-left"></use>
        </svg>
      </div>
    </div>
    <div class="content content-rotate">
      <img class="background" src="http://ossweb-img.qq.com/images/lol/web201310/skin/big84008.jpg" alt="">
    </div>
    <div class="right">
      <div class="icon-circle">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-acg-like_fill"></use>
        </svg>
      </div>
      <div class="icon-circle">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-acg-like"></use>
        </svg>
        <span>125.08W</span>
      </div>
      <div class="icon-circle">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-acg-pinglun"></use>
        </svg>
        <span>1.5W</span>
      </div>
      <div class="icon-circle">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-acg-zhuanfa"></use>
        </svg>
        <span>1786</span>
      </div>
    </div>
    <div class="footer">
      <div class="message">
        <div class="name">
          @{{ name }}
        </div>
        <div class="txt">
          设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。
        </div>
        <div class="music">
          <svg class="iconfont" aria-hidden="true">
            <use xlink:href="#icon-acg-music"></use>
          </svg>
          <words-loop :words="music"></words-loop>
        </div>
      </div>
      <div class="music-cd">
        音乐图标
      </div>
    </div>
  </div>
</template>

<script>
  import WordsLoop from 'components/common/WordsLoop'
  export default {
    data() {
      return {
        data: '',
        name: 'Leo',
        music: '女生版各种语气说不行 - 晨宁溪'
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },
    components: {
      WordsLoop
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .slideview-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: $color-background;
    color: $color-white;
    z-index: 150;
    .top {
      position: absolute;
      height: 2rem;
      line-height: 2rem;
      font-size: $font-size-medium-x;
      padding: 0 5px;
      z-index: 1;
    }
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
    .right {
      position: absolute;
      bottom: 5rem;
      right: 0;
      display: flex;
      flex-flow: column;
      .icon-circle {
        margin: 5px;
        display: flex;
        flex-flow: column;
        align-items: center;
        font-size: $font-size-small;
        .iconfont {
          opacity: 0.8;
          font-size: $font-size-large-xx;
        }
      }
    }
    .footer {
      position: fixed;
      padding: 0 5px;
      bottom: 0;
      left: 0;
      right: 0;
      margin-bottom: 10px;
      display: flex;
      .message {
        width: 80%;
        line-height: $font-size-medium-x;
        font-size: $font-size-medium;
        .name {
          font-size: $font-size-medium-x;
          font-weight: bold;
        }
        .txt {
          margin: 5px 0;
        }
        .music {
          width: 70%;
          .iconfont {
            float: left;
          }
        }
      }
      .music-cd {
        width: 20%;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
  }
</style>
