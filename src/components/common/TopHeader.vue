<template>
  <div class="top-fixed">
    <div class="top">
      <div class="search-wrapper">
        <div class="icon-search">
          <i class="iconfont icon-acg-search" @click="showSearch"></i>
        </div>
        <div class="search-inp" v-show="showFlag">
          <input type="text">
          <span @click.stop="hideSearch">取消</span>
        </div>
      </div>
      <div class="logo" v-show="!showFlag">
        <img :src="logoImg" alt="logo">
      </div>
    </div>
    <div class="nav-wrapper" ref="navWrapper">
      <ul>
        <router-link v-for="(nav, i) in menuNav" :key="i" :to="nav.url" tag="li">{{ nav.name }}</router-link>
      </ul>
    </div>
    <search-result ref="searchResult"></search-result>
  </div>
</template>

<script>
  import SearchResult from 'components/common/searchResult'
  export default {
    name: 'TopHeader',
    data() {
      return {
        logoImg: 'http://paxr4fk3y.bkt.clouddn.com/logo/acgVoice-logo.png',
        menuNav: [
          {
            name: '推荐',
            url: '/recommend'
          },
          {
            name: '角色',
            url: '/character'
          },
          {
            name: '歌单',
            url: '/voiceList'
          }
        ],
        navIndex: 0,
        showFlag: false
      }
    },
    methods: {
      changeNav(index) {
        this.navIndex = index
      },
      showSearch() {
        this.showFlag = true
        this.$refs.searchResult.show()
      },
      hideSearch() {
        this.showFlag = false
        this.$refs.searchResult.hide()
      }
    },
    components: {
      SearchResult
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .top-fixed {
    position: fixed;
    top: 0;
    height: 4rem;
    width: 100%;
    background: $color-background;
    color: $color-text;
    z-index: 99;
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
    .search-wrapper {
      position: absolute;
      left: 13px;
      width: 100%;
      .icon-search {
        position: absolute;
        z-index: 10;
        i {
          font-size: 1.5rem;
        }
      }
      .search-inp {
        input {
          position: relative;
          top: 1px;
          width: 75%;
          height: 1.5rem;
          border-radius: 20px;
          background: $color-deepgray;
          color: $color-white;
          outline: none;
          text-indent: 1.5rem;
        }
      }
    }
  }
  .nav-wrapper {
    position: absolute;
    top: 2rem;
    padding: 5px 0;
    height: 2rem;
    width: 100%;
    background: $color-background;
    color: $color-text;
    box-sizing: border-box;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        padding: 2px 5px;
        &.router-link-active {
          border-bottom: 2px solid $color-active;
          color: $color-active;
        }
      }
    }
  }
</style>
