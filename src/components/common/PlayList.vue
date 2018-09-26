<template>
  <div class="play-list" v-show="showFlag" @click="hidePlayList">
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
        <div class="play-mode" @click="changeMode">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="`#${modeIcon.icon}`"></use>
          </svg>
          <span>{{ modeIcon.txt }}</span>
        </div>
        <div class="clear" @click="clear">
          <span>清空列表</span>
          <svg class="iconfont" aria-hidden="true">
            <use xlink:href="#icon-acg-clear"></use>
          </svg>
        </div>
      </div>
      <scroll class="list-content" ref="listContent">
        <ul>
          <li v-for="(item, i) in data" :key="i" class="item" :class="[currentIndex === i ? 'active' : '']"
            @click="selectItem(item, i)"
          >
            <i class="iconfont icon-acg-speaker i-speaker" v-if="currentIndex === i && playing"></i>
            <div class="list-num" v-if="showRank">{{ i + 1 }}</div>
            <div class="list-text">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </scroll>
      <div class="close" @click="hidePlayList">
        <p>关闭</p>
      </div>
    </div>
  </div>
</template>

<script>
  import VoiceList from 'components/common/VoiceList'
  import Scroll from 'components/common/Scroll'
  import { playModeList, modeIconClass } from 'common/js/config'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    props: {
      data: {
        type: Array,
        default: null
      },
      showRank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showFlag: false,
        scrollRefresh: false
      }
    },
    computed: {
      modeIcon() {
        return modeIconClass[this.mode]
      },
      ...mapGetters([
        'currentIndex',
        'playing',
        'mode'
      ])
    },
    methods: {
      show() {
        this.showFlag = true
        this.$refs.listContent.scrollRefresh()
      },
      hidePlayList() {
        this.showFlag = false
      },
      selectItem(item, index) {
        this.setCurrentIndex(index)
        this.setPlaying(true)
      },
      changeMode() {
        const modeIndex = playModeList.indexOf(this.mode)
        this.setMode(playModeList[modeIndex === playModeList.length - 1 ? 0 : modeIndex + 1])
      },
      clear() {
        this.clearPlaylist()
        this.showFlag = false
      },
      ...mapMutations({
        setPlaying: 'SET_PALYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setMode: 'SET_PALY_MODE'
      }),
      ...mapActions(['clearPlaylist'])
    },
    components: {
      VoiceList,
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .play-list {
    z-index: 200;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .list-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 10px 10px 0 0;
      background-color: $color-background;
      color: $color-white;
      .list-header {
        background-color: $color-deepgray;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        color: $color-text;
      }
      .list-content {
        max-height: 20rem;
        overflow: hidden;
        .item {
          display: flex;
          padding: 10px;
          position: relative;
          .i-speaker {
            margin-right: 5px;
          }
          .list-num {
            margin: 0 10px;
            display: flex;
            justify-content: center;
            flex-flow: column;
          }
          .list-text {
            line-height: 1rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          &.active {
            color: $color-green;
          }
        }
      }
      .close {
        padding: 10px;
        width: 100%;
        text-align: center;
        background-color: $color-deepgray;
        color: $color-text;
      }
    }
  }
</style>