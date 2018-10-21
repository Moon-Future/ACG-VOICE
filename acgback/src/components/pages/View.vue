<template>
  <div class="view-wrapper">
    <div class="top">
      <div class="back">
        <svg class="iconfont icon-back" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-acg-arrow-left"></use>
        </svg>
      </div>
    </div>
    <slide-view :viewData="viewData"></slide-view>
    <slide-view :viewData="viewData"></slide-view>
  </div>
</template>

<script>
  import SlideView from 'components/common/SlideView'
  export default {
    data() {
      return {
        viewData: {}
      }
    },
    activated() {
      this.viewData = {
        img: 'http://ossweb-img.qq.com/images/lol/web201310/skin/big84008.jpg',
        video: '',
        name: 'Leo',
        music: '女生版各种语气说不行 - 晨宁溪',
        followed: false,
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },
    components: {
      SlideView
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .view-wrapper {
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
  }
</style>
