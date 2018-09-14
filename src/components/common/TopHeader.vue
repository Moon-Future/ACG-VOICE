<template>
  <div class="top-fixed">
    <div class="top">
      <div class="search-wrapper" ref="searchWrapper">
        <div class="icon-search">
          <i class="iconfont icon-acg-search" @click="showSearch"></i>
        </div>
        <div class="search-inp" v-show="showFlag">
          <input type="text" v-model="value">
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
    <search-result
      :searchData="searchData"
      :loadingShowFlag="loadingShowFlag"
      ref="searchResult"
    >
    </search-result>
  </div>
</template>

<script>
  import SearchResult from 'components/common/SearchResult'
  import apiUrl from '@/serviceAPI.config.js'
  import { code } from 'common/js/config'
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
        showFlag: false,
        value: '',
        searchData: [],
        loadingShowFlag: false,
        emptyShowFlag: false
      }
    },
    created() {
      this.timer = null
      this.delay = 300
    },
    methods: {
      changeNav(index) {
        this.navIndex = index
      },
      showSearch() {
        this.showFlag = true
        this.$refs.searchResult.show()
        this.$refs.searchWrapper.style.transform = 'translateX(-8px)'
      },
      hideSearch() {
        this.showFlag = false
        this.$refs.searchResult.hide()
        this.$refs.searchWrapper.style.transform = 'translateX(0)'
      },
      seach() {
        this.loadingShowFlag = true
        this.$http.get(apiUrl.search, {
          params: {value: this.value}
        }).then((res) => {
          this.loadingShowFlag = false
          res = res.data
          if (res.code === code.success) {
            this.searchData = res.result.data
          }
        })
      },
      _delay(callback, ms) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          callback()
        }, ms);
      }
    },
    watch: {
      value() {
        if (this.value === '') {
          this.loadingShowFlag = false
          return
        }
        this._delay(this.seach, this.delay)
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
      height: 2rem;
      .icon-search {
        position: absolute;
        z-index: 10;
        height: 2rem;
        i {
          font-size: 1.3rem;
        }
      }
      .search-inp {
        height: 2rem;
        input {
          position: relative;
          top: 1px;
          width: 78%;
          height: 1.5rem;
          border-radius: 20px;
          background: $color-deepgray;
          color: $color-white;
          outline: none;
          padding-left: 1.5rem;
          box-sizing: border-box;
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
