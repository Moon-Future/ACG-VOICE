<template>
  <div class="search-result" ref="searchResult" v-show="showFlag">
    <div class="no-data" v-show="emptyShowFlag">没有数据</div>
    <loading :src="loadingPic" v-show="loadingShowFlag"></loading>
    <scroll :data="voiceData" v-show="!loadingShowFlag">
      <div class="data-wrapper">
        <ul class="voice-list" v-show="!suggestFlag">
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
        <ul class="suggest-list" v-show="suggestFlag">
          <li @click="selectSuggest(inputValue)" class="search-suggset">搜索 “{{ inputValue }}”</li>
          <li v-for="(data, i) in suggestData" :key="i" @click="selectSuggest(data)">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-acg-search"></use>
            </svg>
            <p>{{ data }}</p>
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
      suggestData: {
        type: Array,
        default() {
          return ["周杰伦", "周杰", "周杰艺", "周杰伦", "告白气球", "简单爱", "青花瓷", "可爱女人", "七里香", "夜曲", "屋顶", "藉口", "不能说的秘密"]
        } 
      },
      inputValue: {
        type: String,
        default: ''
      },
      emptyShowFlag: {
        type: Boolean,
        default: false
      },
      loadingShowFlag: {
        type: Boolean,
        default: false
      },
      suggestFlag: false
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
        let postData
        if (data.platform === 'wyy') {
          postData = {id: data.id, name: data.name, arId: data.ar.id, arName: data.ar.name, coverimg: data.al.coverimg, platform: data.platform}
        }
        this.$http.post(apiUrl.getVoiceByKey, postData).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.selectOne(res.data.message)
          }
        })
      },
      selectSuggest(value) {
        this.$emit('searchValue', value)
      },
      ...mapActions([
        'selectOne'
      ])
    },
    watch: {
      searchData() {
        console.log('searchData', this.searchData)
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
    z-index: 100;
    .no-data {
      text-align: center;
      padding: 10px;
    }
    .data-wrapper {
      padding-left: 10px;
      .voice-list {
        li {
          line-height: initial;
          display: flex;
          justify-content: space-between;
          padding: 10px 5px;
          border-bottom: 1px solid $color-gray;
          &.character-data {
            justify-content: flex-start;
            align-items: center;
            img.character-avatar {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 10px;
            }
            .goinfo {
              position: absolute;
              right: 15px;
            }
          }
          .text {
            width: 85%;
            p {
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
      .suggest-list {
        li {
          display: flex;
          align-items: center;
          &.search-suggset {
            border-bottom: 1px solid $color-gray;
          }
          p {
            margin-left: 10px;
            font-size: $font-size-medium;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            flex: 1;
            border-bottom: 1px solid $color-gray;
          }
        }
      }
    }
  }
</style>
