<template>
  <div class="search-result" ref="searchResult" v-show="showFlag">
    <div class="no-data" v-show="emptyShowFlag">没有数据</div>
    <loading :src="loadingPic" v-show="loadingShowFlag"></loading>
    <scroll :data="voiceData">
      <div class="data-wrapper">
        <ul class="voice-list">
          <li class="character-data" v-show="characterData.platform">
            <img :src="characterData.avatar" alt="" class="character-avatar">
            <div class="character-name">
              <span>{{ characterData | fillCharacter }}</span>
              <span v-show="characterData.alias && characterData.alias.length > 0">({{ characterData.alias && characterData.alias.join(', ') }})</span>
            </div>
            <div class="goinfo">></div>
          </li>
          <li v-for="(data, i) in voiceData" :key="i" @click="selectItem(data)">
            <div class="text">
              <p class="voice">{{ [data, 'voiceName'] | fillVoice }}</p>
              <span class="character">{{ [data, 'characterName'] | fillVoice }}</span>
            </div>
            <div class="from">
              <svg class="iconfont" aria-hidden="true">
                <use :xlink:href="`#${data.platform === 'wyy' ? 'icon-acg-wangyiyunyinyue' : ''}`"></use>
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
  import Loading from 'components/common/Loading'
  import apiUrl from '@/serviceAPI.config.js'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    props: {
      searchData: {
        type: Object,
        default: null
      },
      emptyShowFlag: {
        type: Boolean,
        default: false
      },
      loadingShowFlag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showFlag: false,
        loadingPic: require('assets/loading.gif'),
        characterData: {},
        voiceData: []
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
        this.$http.get(apiUrl.getVoice, {
          params: {voiceID: data.voiceID, voiceName: data.voiceName, characterID: data.characterID, characterName: data.characterName, album: data.album}
        }).then(res => {
          const result = res.data
          this.selectOne(result.data)
        })
      },
      ...mapActions([
        'selectOne'
      ])
    },
    watch: {
      searchData() {
        this.voiceData = this.searchData && this.searchData.voice && this.searchData.voice.data
        this.characterData = this.searchData && this.searchData.character
      }
    },
    filters: {
      fillVoice([data, field]) {
        if (field === 'voiceName') {
          return data.platform === 'wyy' ? data.name : data.voiceName
        } else if (field === 'characterName') {
          return data.platform === 'wyy' ? data.ar.name : data.characterName
        }
      },
      fillCharacter(data) {
        return data.platform === 'wyy' ? data.name : data.characterName
      }
    },
    components: {
      Scroll,
      Loading
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
    .no-data {
      text-align: center;
      padding: 10px;
    }
    .data-wrapper {
      padding-left: 10px;
      .voice-list {
        li.character-data {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .goinfo {
            position: absolute;
            right: -15px;
          }
        }
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
            .iconfont {
              font-size: 1.5rem;
            }
          }
        }
      }
    }
  }
</style>
