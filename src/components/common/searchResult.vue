<template>
  <div class="search-result" ref="searchResult" v-show="showFlag">
    <div class="no-data" v-show="searchData.length === 0">没有数据</div>
    <scroll :data="searchData">
      <div class="data-wrapper">
        <ul class="song-list">
          <li v-for="(data, i) in searchData" :key="i">
            <div class="text">
              <p class="song">{{ data.songName }}</p>
              <p class="singer">{{ data.singerName }}</p>
            </div>
            <div class="from">
              <i class="iconfont icon-acg-wangyiyunyinyue"></i>
            </div>
            <div class="mroe"></div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/Scroll'
  export default {
    props: {
      searchData: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .search-result {
    position: fixed;
    top: 2rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: $color-deepgray;
    color: $color-white;
    padding: 0 10px;
    .no-data {
      text-align: center;
      padding: 10px;
    }
    .song-list {
      li {
        padding: 13px 5px;
        .text {
        }
      }
    }
  }
</style>
