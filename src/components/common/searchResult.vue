<template>
  <div class="search-result" ref="searchResult" v-show="showFlag">
    <div class="no-data" v-show="searchData.length === 0">没有数据</div>
    <scroll :data="searchData">
      <div class="data-wrapper">
        <ul class="song-list">
          <li v-for="(data, i) in searchData" :key="i" @click="selectItem(data)">
            <div class="text">
              <p class="song">{{ data.songName }}</p>
              <span class="singer">{{ data.singerName }}</span>
            </div>
            <div class="from">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-acg-wangyiyunyinyue"></use>
              </svg>
            </div>
            <div class="more">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-acg-more"></use>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/Scroll'
  import apiUrl from '@/serviceAPI.config.js'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
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
      },
      selectItem(data) {
        console.log('data', data)
        this.$http.get(apiUrl.getSong, {
          params: {songID: data.songID, songName:data.songName}
        }).then(res => {
          const result = res.data
          this.selectOne(result.data)
        })
      },
      ...mapActions([
        'selectOne'
      ])
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
    bottom: 2rem;
    left: 0;
    right: 0;
    overflow: hidden;
    background: $color-deepgray;
    color: $color-white;
    padding-left: 10px;
    .no-data {
      text-align: center;
      padding: 10px;
    }
    .song-list {
      li {
        display: flex;
        justify-content: space-between;
        padding: 13px 5px;
        border-bottom: 1px solid $color-gray;
        .text {
          width: 85%;
          p {
            padding-bottom: 5px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          span {
            font-size: $font-size-medium;
            color: $color-gray;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .from {
          margin: auto;
        }
        .more {
          margin: auto;
          .icon {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
</style>
