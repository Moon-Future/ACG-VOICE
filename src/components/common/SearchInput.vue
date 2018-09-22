<template>
  <div class="search-wrapper" ref="searchWrapper">
    <div class="icon-search">
      <i class="iconfont icon-acg-search" @click="showSearch"></i>
    </div>
    <div class="search-inp" v-show="showFlag">
      <input type="text" v-model="value" @input="searchSuggest" @focus="searchFoucs" ref="searchInput">
      <span @click.stop="hideSearch">取消</span>
    </div>
    <search-result
      :searchData="searchData"
      :suggestData="suggestData"
      :suggestFlag="suggestFlag"
      :inputValue="value"
      :loadingShowFlag="loadingShowFlag"
      @searchValue="search"
      ref="searchResult"
    >
    </search-result>
  </div>
</template>

<script>
  import SearchResult from 'components/common/SearchResult'
  import apiUrl from '@/serviceAPI.config.js'
  export default {
    data() {
      return {
        showFlag: false,
        value: '',
        searchData: {},
        suggestData: [],
        suggestFlag: [],
        loadingShowFlag: false
      }
    },
    methods: {
      showSearch() {
        this.showFlag = true
        this.$refs.searchResult.show()
        this.$refs.searchInput.focus()
        this.$emit('showLogo', false)
      },
      hideSearch() {
        this.showFlag = false
        this.$refs.searchResult.hide()
        this.$emit('showLogo', true)
      },
      searchFoucs() {
        this.suggestFlag = true
      },
      searchSuggest(e) {
        this.value = e.target.value.replace(/\'/g, '').trim()
        if (this.value === '') {
          this.suggestData = []
          return
        }
        this.$http.post(apiUrl.searchSuggest, {value: this.value}).then(res => {
          if (res.data.code === 200) {
            this.suggestData = res.data.message
          }
        })
      },
      search(value) {
        this.$refs.searchInput.blur()
        this.value = value
        if (this.value.trim() === '') {
          return
        }
        this.suggestFlag = false
        this.loadingShowFlag = true
        this.$http.post(apiUrl.search, {value: this.value}).then(res => {
          this.loadingShowFlag = false
          if (res.data.code === 200) {
            this.searchData = res.data.message
          }
        })
      }
    },
    components: {
      SearchResult
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .search-wrapper {
    position: absolute;
    padding-left: 15px;
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
</style>
