<template>
  <div class="slideview-wrapper" ref="slideviewWrapper">
    <div class="content">
      <img class="background" :src="viewData.img" alt="">
    </div>
    <div class="right">
      <div class="icon-circle">
        <div class="iconfont avatar">
          <img :src="viewData.img" alt="" ref="img">
        </div>
        <div class="follow" :class="viewData.followed ? 'followed' : ''" @click="follow">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="`#${iconFollow}`"></use>
          </svg>
        </div>
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
          @{{ viewData.name }}
        </div>
        <div class="txt">
          设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。
        </div>
        <div class="music">
          <svg class="iconfont" aria-hidden="true">
            <use xlink:href="#icon-acg-music"></use>
          </svg>
          <words-loop :words="viewData.music"></words-loop>
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
    props: {
      viewData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        iconFollow: 'icon-acg-iconjia'
      }
    },
    methods: {
      follow() {
        this.viewData.followed = !this.viewData.followed
        this.iconFollow = this.viewData.followed ? 'icon-acg-icongou' : 'icon-acg-iconjia'
      }
    },
    watch: {
      viewData() {
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
    position: relative;
    height: 100%;
    .content {
      display: flex;
      align-items: center;
      height: 100%;
      .background {
        width: 100%;
      }
      &.content-rotate {
        justify-content: center;
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
        position: relative;
        .iconfont {
          opacity: 0.8;
          font-size: $font-size-large-xx;
        }
        .avatar {
          box-sizing: border-box;
          border: 1px solid;
          border-radius: 50%;
          position: relative;
          img {
            height: 100%;
          }
        }
        .follow {
          position: absolute;
          bottom: -10px;
          font-size: $font-size-large;
          background-color: $color-red;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          padding: 5px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          &.followed {
            background-color: $color-green;
          }
        }
      }
    }
    .footer {
      position: absolute;
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
